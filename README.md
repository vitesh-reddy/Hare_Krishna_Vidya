# Hare Krishna Vidya

**Hare Krishna Vidya** is a production-grade, full-stack web application for facilitating donations to the needy, built as part of an internship project. The platform enables individuals to contribute through monetary donations or by donating essential items, while also providing a transparent and interactive experience for donors, job seekers, and administrators.

---

## 🌟 Features

### Donation Platform
- **Amount Donations:**  
  - **Annadaan:** Sponsor meals for the underprivileged.
  - **Vidyadaan:** Support education for children.
  - **Sponsor a Child:** Fund a child's holistic development.
- **Item Donations:**  
  - Donate pre-defined kits or groceries directly to beneficiaries.
- **Donation Flow:**  
  - Secure payment integration.
  - Real-time progress bars and impact visualization.
  - Success receipts and sharing options.

### Fundraising Campaigns
- Users can create and manage fundraising campaigns.
- Campaigns display progress, goals, and recent donations.

### Blog & Updates
- **Blog Page:**  
  - Paginated blog listing for updates, stories, and transparency.
- **Recent Activity:**  
  - Admins can post updates on donation impact and organizational activities.

### Careers
- **Careers Page:**  
  - Paginated job listings for seekers.
  - Admins can post, edit, and remove vacancies.

### Super Admin Dashboard
- **Authentication:**  
  - Secure JWT + cookie-based login.
- **Analytics:**  
  - View recent activities, donations, and campaign performance.
- **Management:**  
  - Full CRUD for blogs, jobs, donation kits, groceries, campaigns, and user roles.

### Transparency & Trust
- **Impact Sections:**  
  - Visual breakdowns of how donations are used.
- **Certifications:**  
  - Display of NGO certifications and compliance.
- **Bank Details:**  
  - Transparent bank and UPI details for direct donations.

### Additional Features
- **Responsive Design:**  
  - Fully mobile-friendly and accessible.
- **SEO Optimized:**  
  - Meta tags, manifest, and best practices for discoverability.
- **Third-party Integrations:**  
  - Razorpay for payments, Google Analytics, and more.

---

## 🗂️ Codebase Structure

```
/client      # Frontend (React + Tailwind CSS)
/admin       # Admin dashboard (React + Tailwind CSS)
/server      # Backend (Node.js + Express + MongoDB + Redis)
```

- **Frontend:**  
  - Organized into pages, components, and context providers.
  - UI folder contains reusable UI primitives.
  - Asset management for images and icons.
- **Admin:**  
  - Dedicated dashboard for super admin with analytics and management tools.
- **Server:**  
  - RESTful API for all resources (donations, blogs, jobs, campaigns, etc.).
  - JWT authentication, secure cookies, and role-based access.
  - Email notifications and payment webhooks.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Redis Upstash Instance
- [Razorpay](https://razorpay.com/) account for payment integration

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-org/hare-krishna-vidya.git
   cd hare-krishna-vidya
   ```

2. **Install dependencies for each workspace:**
   ```sh
   npm install --prefix client
   npm install --prefix admin
   npm install --prefix server
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in each folder and fill in the required values.

4. **Run the development servers in the root directory:**
   - **Frontend:**  
     ```sh
     npm run client
     ```
   - **Admin:**  
     ```sh
     npm run admin
     ```
   - **Backend:**  
     ```sh
     npm run server
     ```

---

## 🛡️ Security & Best Practices

- All sensitive operations are protected by JWT authentication and secure cookies.
- Input validation and sanitization are enforced on both client and server.
- Rate limiting, helmet, and CORS are enabled on the backend.
- Production-ready error handling and logging.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

---

## 🙏 Acknowledgements

- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives.
- [Razorpay](https://razorpay.com/) for payment processing.
- [MongoDB](https://www.mongodb.com/) for database.
- [Redis](https://redis.io/) for Database Caching.
- All contributors and the Hare Krishna Movement for inspiration.

---

> **Hare Krishna Vidya** — Spreading Education & Values through Service
