# Hare Krishna Vidya API Documentation

This document describes the RESTful API endpoints for the Hare Krishna Vidya backend server. All endpoints are prefixed with `/api` unless otherwise specified.

---

## Authentication

### Admin Login
- **POST** `/api/admin/login`
  - Request: `{ email, password }`
  - Response: `{ token, admin }`

### Admin Logout
- **POST** `/api/admin/logout`
  - Clears authentication cookies.

---

## Donations

### Create Donation
- **POST** `/api/donations`
  - Request: `{ donorName, amount, type, ... }`
  - Response: `{ donation, status }`

### Get All Donations
- **GET** `/api/donations`
  - Response: `[ { donation }, ... ]`

---

## Blogs

### Get All Blogs
- **GET** `/api/blogs`
  - Response: `[ { blog }, ... ]`

### Get Blog by ID
- **GET** `/api/blogs/:id`
  - Response: `{ blog }`

### Create Blog (Admin)
- **POST** `/api/admin/blogs`
  - Request: `{ title, content, ... }`
  - Response: `{ blog }`

### Update Blog (Admin)
- **PUT** `/api/admin/blogs/:id`
  - Request: `{ title?, content?, ... }`
  - Response: `{ blog }`

### Delete Blog (Admin)
- **DELETE** `/api/admin/blogs/:id`
  - Response: `{ success: true }`

---

## Careers / Jobs

### Get All Jobs
- **GET** `/api/jobs`
  - Response: `[ { job }, ... ]`

### Apply for Job
- **POST** `/api/jobs/apply`
  - Request: `{ name, email, resume, ... }`
  - Response: `{ application, status }`

### Admin: Manage Jobs
- **POST** `/api/admin/jobs`
- **PUT** `/api/admin/jobs/:id`
- **DELETE** `/api/admin/jobs/:id`

---

## Grocery Items & Kits

### Get All Grocery Items
- **GET** `/api/grocery-items`
  - Response: `[ { item }, ... ]`

### Admin: Manage Grocery Items
- **POST** `/api/admin/grocery-items`
- **PUT** `/api/admin/grocery-items/:id`
- **DELETE** `/api/admin/grocery-items/:id`

### Get All Kits
- **GET** `/api/kits`
  - Response: `[ { kit }, ... ]`

### Admin: Manage Kits
- **POST** `/api/admin/kits`
- **PUT** `/api/admin/kits/:id`
- **DELETE** `/api/admin/kits/:id`

---

## Campaigns

### Get All Campaigns
- **GET** `/api/campaigns`
  - Response: `[ { campaign }, ... ]`

### Create Campaign
- **POST** `/api/campaigns`
  - Request: `{ title, description, goal, ... }`
  - Response: `{ campaign }`

---

## Applications (Fundraising, Volunteers, etc.)

### Submit Application
- **POST** `/api/applications`
  - Request: `{ name, email, type, ... }`
  - Response: `{ application, status }`

### Admin: Manage Applications
- **GET** `/api/admin/applications`
- **PUT** `/api/admin/applications/:id`
- **DELETE** `/api/admin/applications/:id`

---

## Recent Activities & Updates

### Get Recent Activities
- **GET** `/api/recent-activities`
  - Response: `[ { activity }, ... ]`

### Admin: Post Activity
- **POST** `/api/admin/recent-activities`
- **DELETE** `/api/admin/recent-activities/:id`

---

## Subscribers

### Subscribe to Blog
- **POST** `/api/blogs/subscribe`
  - Request: `{ email }`
  - Response: `{ success: true }`

---

## Notes
- All admin routes require JWT authentication via cookies.
- All POST/PUT requests expect JSON bodies.
- File uploads (e.g., resumes, images) use `multipart/form-data`.
- Error responses are in the form `{ error: 'message' }`.

---

For more details, refer to the server source code and controller files.
