# Hare Krishna Vidya Server

This is the backend server for the Hare Krishna Vidya project, providing RESTful APIs for donation management, blogs, jobs, campaigns, admin analytics, and more.

---

## 🚀 Features
- Secure JWT + cookie-based authentication for super admin
- Donation APIs (amount & item donations)
- Blog management (CRUD, pagination, subscriptions)
- Careers/jobs management (CRUD, applications)
- Fundraising campaigns (CRUD)
- Grocery items & kits management
- Recent activities & updates
- File uploads (images, resumes)
- Email notifications (Brevo/Nodemailer)
- Payment integration (Razorpay)
- Analytics endpoints for admin dashboard

---

## 🛠️ Tech Stack
- **Node.js** 
- **Express.js** (REST API framework)
- **MongoDB** (database)
- **Redis** (caching)
- **Mongoose** (ODM)
- **JWT** (authentication)
- **Cloudinary** (image uploads)
- **Razorpay** (payment gateway)
- **Nodemailer/Brevo** (email notifications)

---

## 📂 Project Structure

```
server/
  config/         # Configuration files (db, cloudinary, redis, mail)
  controllers/    # Route handler logic
  middleware/     # Auth and other middleware
  models/         # Mongoose models
  routes/         # Express route definitions
  services/       # Business logic and integrations
  utils/          # Utility functions (e.g., sendMail)
  server.js       # Entry point
  API_DOC.md      # API documentation
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Redis Upstash Instance
- [Razorpay](https://razorpay.com/) account for payment integration

### Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (MongoDB URI, JWT secret, Razorpay keys, Cloudinary, Brevo, etc.).

3. **Start the server:**
   ```sh
   npm run dev
   ```
   or
   ```sh
   node server.js
   ```

---

## 📖 API Documentation

See [`API_DOC.md`](./API_DOC.md) for a full list of endpoints, request/response formats, and usage notes.

---

## 🛡️ Security & Best Practices
- All admin routes require JWT authentication via cookies.
- Input validation and sanitization are enforced.
- Rate limiting, helmet, and CORS are enabled.
- Production-ready error handling and logging.

---

## 🤝 Contributing
Pull requests and issues are welcome!

---

> **Hare Krishna Vidya Server** — Powering transparent and impactful giving.
