# Stripe Payment Flow & Idempotency

This document describes how Stripe payments are implemented across the Hare_Krishna_Vidya project, including:

- Overall architecture
- Donation state model
- Stripe Checkout & webhooks
- Idempotency and fingerprinting
- Admin refunds

The goal is a webhook-first, append-only ledger that avoids duplicate charges even in retry/refresh scenarios.

---

## 1. High-Level Architecture

- **Client app (donor-facing)**: `client/`
  - Handles the donation flows (amount and items/cart).
  - Calls backend endpoint to create a Stripe Checkout Session.
  - Redirects the user to Stripe and then to a success page.

- **Admin app**: `admin/`
  - Provides dashboards to view donations and trigger refunds.

- **Backend API**: `server/`
  - Express server exposing payment endpoints under `/api/payments`.
  - Integrates with Stripe using the official Node SDK.
  - Persists donations in MongoDB via the Donation model.

Key backend files:

- [server/server.js](server/server.js)
- [server/routes/paymentRoutes.js](server/routes/paymentRoutes.js)
- [server/services/stripeService.js](server/services/stripeService.js)
- [server/models/Donations.js](server/models/Donations.js)

---

## 2. Donation Model & State Machine

The canonical donation record is defined in:

- [server/models/Donations.js](server/models/Donations.js)

Important fields:

- `donationType`: `'amount' | 'items'`.
- `donatedFor`: `'Annadaan' | 'Sponsor a Child' | 'Vidyadaan' | null`.
- `items[]`: normalized items for item-based donations (IDs, type, name, quantity, unit price).
- `amount`: total donation amount in INR.
- `currency`: always `INR` for now.
- `paymentProvider`: currently `'stripe'`.
- `stripeCheckoutSessionId`, `stripePaymentIntentId`: Stripe references.
- `status`: `'pending' | 'succeeded' | 'failed' | 'refunded'`.
- `statusHistory[]`: append-only log of status transitions with `source` and optional `reason`.
- `refundHistory[]`: refund events (id, time, admin).
- `idempotencyKey`: unique string used to group a single logical donation attempt.

State transitions (simplified):

- `pending` → `succeeded` (via Stripe webhook `checkout.session.completed`).
- `pending` → `failed` (via Stripe webhook `checkout.session.expired`).
- `succeeded` → `refunded` (via admin-initiated refund only).

Only webhooks and the refund service are allowed to change these states; the public payment API does **not** directly upgrade `pending` donations to `succeeded` or `failed`.

---

## 3. Stripe Checkout & Webhooks

### 3.1. Checkout Session Creation

Route:

- `POST /api/payments/stripe/create-checkout-session`
- Implemented in [server/routes/paymentRoutes.js](server/routes/paymentRoutes.js)
- Delegates to `createStripeCheckoutSession` in [server/services/stripeService.js](server/services/stripeService.js)

Request body (shared for amount and items):

```json
{
  "donationType": "amount" | "items",
  "donatedFor": "Annadaan" | "Sponsor a Child" | "Vidyadaan" | null,
  "items": [ ... ],
  "amount": 1234,
  "donorInfo": { ... },
  "idempotencyKey": "<client-generated UUID, optional>"
}
```

Important rules:

- For `donationType: 'items'`, the server recomputes the total amount from the latest item data in the database (price, active flag, etc.).
- For `donationType: 'amount'`, the server validates the numeric amount is positive.

`createStripeCheckoutSession`:

- Validates input.
- Computes `finalAmount` and normalizes `items` when needed.
- Determines the effective `idempotencyKey` (see section 4).
- Creates or reuses a `Donation` document.
- Creates a Stripe Checkout Session with:
  - `mode: 'payment'`
  - `line_items` from `amount`/`items`
  - `metadata.donationId`, `metadata.donationType`, `metadata.donatedFor`
- Saves `stripeCheckoutSessionId` (+ `stripePaymentIntentId` when available).
- Returns `{ url: session.url }` to the caller.

### 3.2. Webhook Handling

Webhook endpoint (raw body required):

- `POST /api/payments/stripe/webhook`
- Defined in [server/server.js](server/server.js)
- Uses `stripe.webhooks.constructEvent` to verify signatures.

Handled events (in `handleStripeWebhook` in [server/services/stripeService.js](server/services/stripeService.js)):

- `checkout.session.completed`:
  - Reads `donationId` from `session.metadata`.
  - Loads the Donation.
  - If it is still `pending`, appends a `statusHistory` entry and sets `status = 'succeeded'`.
  - Updates `stripePaymentIntentId` if present.

- `checkout.session.expired`:
  - Similar to above, but transitions `pending` → `failed` with `reason: 'session_expired'`.

**Important:** the success page and other API endpoints **do not** override the webhook’s decision. Webhooks are the only authority for `pending → succeeded/failed`.

---

## 4. Idempotency & Fingerprinting

The goal of idempotency here is:

- A single *logical* donation attempt (same amount, same flow, same email) should map to a single `Donation` + Stripe Checkout Session.
- Network retries, browser refreshes, or the user re-clicking a disabled button should **not** cause duplicate charges.

There are two layers:

1. **Client-side fingerprinting**
2. **Server-side reuse** keyed by `Donation.idempotencyKey`.

### 4.1. Server-Side Idempotency

Implemented in `createStripeCheckoutSession` in:

- [server/services/stripeService.js](server/services/stripeService.js)

Key ideas:

- The function accepts `idempotencyKey` in its options: `idempotencyKey: requestIdempotencyKey`.
- Effective key:
  - If `requestIdempotencyKey` is provided, use it.
  - Otherwise, generate a new one with `createIdempotencyKey()` (UUID).

Reuse path:

- If `requestIdempotencyKey` is present:
  - Attempt to find `Donation.findOne({ idempotencyKey, status: 'pending' })`.
  - If found and it has `stripeCheckoutSessionId`:
    - Retrieve the existing Stripe Checkout Session.
    - Return its URL/ID without creating a new Donation or session.

Duplicate key handling:

- `idempotencyKey` is marked `unique: true` in the schema.
- When saving a new `Donation`:
  - If Mongo throws a duplicate key error (code 11000/11001):
    - Look up the existing Donation by `idempotencyKey`.
    - If it has a `stripeCheckoutSessionId`, retrieve that session and return it.
    - If it does not exist or has no session, the error is rethrown.

This ensures that, for a given `idempotencyKey`, you either:

- Reuse the existing Donation + Checkout Session, or
- Fail loudly if the data is inconsistent, rather than creating duplicates.

### 4.2. Client-Side Fingerprinting (Amount Flow)

Implemented in:

- [client/src/pages/donate-amount/AmountDonationFlow.jsx](client/src/pages/donate-amount/AmountDonationFlow.jsx)

Logical intent for amount donations:

```ts
{
  flow: 'amount',
  donationType,       // e.g. 'annadan', 'sponsorchild', 'vidhyadana'
  amount,             // numeric
  email: formData.email
}
```

Client-side steps:

1. Build the intent object.
2. Sort the keys and create a normalized JSON string.
3. Compute SHA-256 over that string using the Web Crypto API.
4. Use the hex digest as a **fingerprint**.
5. Store/retrieve an idempotency key in `localStorage` under:
   - `donation_idempotency_<fingerprint>` (value is a UUID).
6. Attach this `idempotencyKey` in the body of `POST /api/payments/stripe/create-checkout-session`.

This means that as long as the user’s flow, type, amount, and email remain the same, all retries for that combination use the same `idempotencyKey` and therefore map to the same Donation + Checkout Session on the server.

Cleanup:

- After a successful response from the backend and immediately before redirecting to Stripe, the code removes the `donation_idempotency_<fingerprint>` key from `localStorage`.
- This keeps the store tidy and lets future donations with the same parameters be treated as a fresh logical attempt.

---

## 5. Admin Refunds

Admin refund support is built on top of the Donation state machine and Stripe Refunds.

Relevant files:

- [server/services/stripeService.js](server/services/stripeService.js)
- [server/routes/paymentRoutes.js](server/routes/paymentRoutes.js)
- [admin/src/contexts/UpdatesAdminContext.jsx](admin/src/contexts/UpdatesAdminContext.jsx)
- [admin/src/pages/components/DashboardOverview.tsx](admin/src/pages/components/DashboardOverview.tsx)

Endpoint:

- `POST /api/payments/stripe/refund/:id`
  - Protected by `protectAdmin`.
  - Calls `refundDonation({ donationId, adminId })`.

`refundDonation` logic (simplified):

- Validate that the Donation:
  - Exists.
  - Has `status === 'succeeded'`.
  - Has not already been refunded (`refundHistory` is empty).
  - Has a `stripePaymentIntentId`.
- Call `stripe.refunds.create({ payment_intent: donation.stripePaymentIntentId })`.
- Append a `statusHistory` entry with `status: 'refunded'` and `source: 'admin:refund'`.
- Push a new entry into `refundHistory` with `refundId`, `refundedAt`, `refundedBy`.
- Set `donation.status = 'refunded'`.

The admin UI shows refund status and history and allows triggering a refund from a donation detail view. State updates propagate both in the detail dialog and in the recent donations list.

---

## 6. Extending the Pattern

To extend idempotency to other flows (e.g. items/cart):

- Define the intent shape for that flow (must capture all inputs that distinguish one logical attempt from another).
- Normalize and hash the intent on the client to get a fingerprint.
- Use the same `donation_idempotency_<fingerprint>` → UUID mapping in `localStorage`.
- Send `idempotencyKey` in the body of `POST /api/payments/stripe/create-checkout-session`.
- The existing server-side logic in `createStripeCheckoutSession` will reuse or create the appropriate Donation + Checkout Session based on the key.

This keeps the behavior consistent across all payment entry points and aligns with the webhook-first, append-only ledger approach described above.
