# Hare Krishna Vidya API Documentation

This document describes the RESTful API endpoints for the Hare Krishna Vidya backend server. All endpoints are prefixed with `/api` unless otherwise specified.

---

## Table of Contents
- [Authentication](#authentication)
- [Blogs](#blogs)
- [Jobs / Careers](#jobs--careers)
- [Applications](#applications)
- [Grocery Items](#grocery-items)
- [Kits](#kits)
- [Campaigns](#campaigns)
- [Payments](#payments)
- [Updates (Admin)](#updates-admin)
- [Health Check](#health-check)

---

## Authentication

All admin routes require JWT authentication via cookies. The token is set automatically upon login.

### Admin Login
- **POST** `/api/admin/login`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "string",
      "admin": {
        "name": "string",
        "email": "string",
        "_id": "string"
      }
    }
    ```

### Admin Logout
- **GET** `/api/admin/logout`
  - **Description:** Clears authentication cookies
  - **Response:** `200 OK`

### Get Admin Profile
- **GET** `/api/admin/me`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "admin": {
        "name": "string",
        "email": "string",
        "_id": "string"
      }
    }
    ```

### Update Admin Profile
- **PATCH** `/api/admin/update-profile`
  - **Auth Required:** Yes
  - **Request Body:**
    ```json
    {
      "name": "string (optional)",
      "email": "string (optional)",
      "password": "string (optional)"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Profile updated successfully",
      "admin": { ... }
    }
    ```

### Forgot Password
- **POST** `/api/admin/forgot-password`
  - **Request Body:**
    ```json
    {
      "email": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Reset password email sent"
    }
    ```

### Reset Password
- **POST** `/api/admin/reset-password`
  - **Request Body:**
    ```json
    {
      "token": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Password reset successfully"
    }
    ```

### Create Default Admin
- **POST** `/api/admin/create-default-admin`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Default admin created successfully",
      "email": "string"
    }
    ```

---

## Blogs

### Public Routes

#### Get Recent Blogs
- **GET** `/api/blogs/recent`
  - **Query Parameters:**
    - `limit` (optional, default: 3): Number of recent blogs to fetch
  - **Response:**
    ```json
    {
      "blogs": [
        {
          "_id": "string",
          "title": "string",
          "content": "string",
          "image": "string",
          "author": "string",
          "status": "Published",
          "createdAt": "date",
          "updatedAt": "date"
        }
      ]
    }
    ```
  - **Caching:** Redis cached

#### Get Published Blogs Count
- **GET** `/api/blogs/count`
  - **Response:**
    ```json
    {
      "totalCount": "number"
    }
    ```
  - **Caching:** Redis cached

#### Get Paginated Published Blogs
- **GET** `/api/blogs/published`
  - **Query Parameters:**
    - `page` (optional, default: 1): Page number
    - `limit` (optional, default: 6): Blogs per page
  - **Response:**
    ```json
    {
      "blogs": [ ... ],
      "totalCount": "number",
      "currentPage": "number",
      "totalPages": "number"
    }
    ```
  - **Caching:** Redis cached

#### Get Blog by ID
- **GET** `/api/blogs/:id`
  - **Response:**
    ```json
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "image": "string",
      "author": "string",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```
  - **Caching:** Redis cached
  - **Error:** `404` if blog not found

#### Add Blog Subscriber
- **POST** `/api/blogs/add-subscriber`
  - **Request Body:**
    ```json
    {
      "email": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "Subscribed"
    }
    ```
  - **Error:**
    - `400` if already subscribed
    - `500` on server error

### Admin Routes (Auth Required)

#### Get All Blogs (Admin)
- **GET** `/api/admin/blogs/all`
  - **Auth Required:** Yes
  - **Query Parameters:**
    - `page` (optional, default: 1)
    - `limit` (optional, default: 10)
  - **Response:**
    ```json
    {
      "blogs": [ ... ],
      "totalCount": "number"
    }
    ```

#### Get Published Blogs Count (Admin)
- **GET** `/api/admin/blogs/published-count`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "count": "number"
    }
    ```
  - **Caching:** Redis cached

#### Upload Blog Image
- **POST** `/api/admin/blogs/upload-image`
  - **Auth Required:** Yes
  - **Content-Type:** `multipart/form-data`
  - **Request:** Form data with `image` file
  - **Response:**
    ```json
    {
      "url": "string (Cloudinary URL)"
    }
    ```

#### Create Blog
- **POST** `/api/admin/blogs/create`
  - **Auth Required:** Yes
  - **Request Body:**
    ```json
    {
      "title": "string",
      "content": "string",
      "image": "string",
      "author": "string",
      "status": "Draft | Published"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Blog created successfully",
      "item": { ... }
    }
    ```

#### Update Blog
- **PUT** `/api/admin/blogs/update/:blogId`
  - **Auth Required:** Yes
  - **Request Body:** (All fields optional)
    ```json
    {
      "title": "string",
      "content": "string",
      "image": "string",
      "author": "string",
      "status": "Draft | Published"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Blog updated successfully",
      "item": { ... }
    }
    ```
  - **Note:** Invalidates related cache entries

#### Toggle Blog Status
- **PATCH** `/api/admin/blogs/toggle-status/:blogId`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "message": "Blog status updated to Published/Draft",
      "item": { ... }
    }
    ```
  - **Note:** Invalidates related cache entries

#### Delete Blog
- **DELETE** `/api/admin/blogs/delete/:blogId`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "message": "Blog deleted successfully"
    }
    ```
  - **Note:** Also deletes associated image from Cloudinary and invalidates cache

#### Get All Subscribers
- **GET** `/api/admin/blogs/subscribers`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    [
      {
        "_id": "string",
        "email": "string",
        "subscribedAt": "date"
      }
    ]
    ```

---

## Jobs / Careers

### Public Routes

#### Get Active Jobs
- **GET** `/api/jobs/active`
  - **Query Parameters:**
    - `skip` (optional, default: 0): Number of jobs to skip
    - `limit` (optional, default: 10): Number of jobs to return
    - `search` (optional, default: ''): Search query
  - **Response:**
    ```json
    {
      "jobs": [
        {
          "_id": "string",
          "title": "string",
          "description": "string",
          "location": "string",
          "employmentType": "string",
          "salary": "string",
          "isActive": true,
          "createdAt": "date"
        }
      ]
    }
    ```

#### Get Job by ID
- **GET** `/api/jobs/:id`
  - **Response:**
    ```json
    {
      "job": { ... }
    }
    ```
  - **Error:** `404` if job not found

### Admin Routes (Auth Required)

#### Get Active Job Count
- **GET** `/api/admin/jobs/active-count`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "count": "number"
    }
    ```

#### Get All Jobs (Admin)
- **GET** `/api/admin/jobs/all`
  - **Auth Required:** Yes
  - **Query Parameters:**
    - `skip` (optional, default: 0)
    - `limit` (optional, default: 10)
  - **Response:**
    ```json
    {
      "jobs": [ ... ],
      "totalCount": "number"
    }
    ```

#### Get Job by ID (Admin)
- **GET** `/api/admin/jobs/:id`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "job": { ... }
    }
    ```

#### Get Applicants Count by Job ID
- **GET** `/api/admin/jobs/applicants-count/:id`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "applicantsCount": "number"
    }
    ```

#### Create Job
- **POST** `/api/admin/jobs`
  - **Auth Required:** Yes
  - **Request Body:**
    ```json
    {
      "title": "string",
      "description": "string",
      "location": "string",
      "employmentType": "string",
      "salary": "string",
      "isActive": "boolean"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Job created",
      "job": { ... }
    }
    ```

#### Update Job
- **PATCH** `/api/admin/jobs/:id`
  - **Auth Required:** Yes
  - **Request Body:** (All fields optional)
    ```json
    {
      "title": "string",
      "description": "string",
      "location": "string",
      "employmentType": "string",
      "salary": "string",
      "isActive": "boolean"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Job updated",
      "job": { ... }
    }
    ```

#### Toggle Job Status
- **PATCH** `/api/admin/jobs/:id/toggle-status`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "message": "Job status toggled",
      "job": { ... }
    }
    ```

#### Delete Job
- **DELETE** `/api/admin/jobs/:id`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "message": "Job and related applications deleted"
    }
    ```
  - **Note:** Also deletes all applications associated with the job

---

## Applications

### Public Routes

#### Submit Application
- **POST** `/api/applications/apply`
  - **Request Body:**
    ```json
    {
      "jobId": "string",
      "name": "string",
      "email": "string",
      "phone": "string",
      "resume": "string (URL)",
      "coverLetter": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Application submitted"
    }
    ```

### Admin Routes (Auth Required)

#### Get Applications by Job ID
- **GET** `/api/admin/applications/:jobId`
  - **Auth Required:** Yes
  - **Query Parameters:**
    - `skip` (optional, default: 0)
    - `limit` (optional, default: 10)
  - **Response:**
    ```json
    {
      "applications": [ ... ],
      "totalCount": "number"
    }
    ```

#### View Application by ID
- **GET** `/api/admin/applications/view/:id`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "applicant": {
        "_id": "string",
        "jobId": "string",
        "name": "string",
        "email": "string",
        "phone": "string",
        "resume": "string",
        "coverLetter": "string",
        "status": "string",
        "appliedAt": "date"
      }
    }
    ```

#### Update Application Status
- **PATCH** `/api/admin/applications/:id/status`
  - **Auth Required:** Yes
  - **Request Body:**
    ```json
    {
      "status": "Pending | Reviewed | Accepted | Rejected"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Status updated",
      "applicant": { ... }
    }
    ```

---

## Grocery Items

### Public Routes

#### Get Active Grocery Items
- **GET** `/api/grocery-items/active`
  - **Response:**
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "image": "string",
        "category": "string",
        "isActive": true
      }
    ]
    ```

#### Get Grocery Item by ID
- **GET** `/api/grocery-items/:id`
  - **Response:**
    ```json
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "image": "string",
      "category": "string",
      "isActive": "boolean"
    }
    ```

### Admin Routes (Auth Required)

#### Get All Grocery Items (Admin)
- **GET** `/api/admin/grocery-items`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    [
      { ... }
    ]
    ```

#### Get Active Grocery Items Count
- **GET** `/api/admin/grocery-items/active-count`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "count": "number"
    }
    ```

#### Upload Grocery Item Image
- **POST** `/api/admin/grocery-items/upload-image`
  - **Auth Required:** Yes
  - **Content-Type:** `multipart/form-data`
  - **Request:** Form data with `image` file
  - **Response:**
    ```json
    {
      "url": "string (Cloudinary URL)"
    }
    ```

#### Create Grocery Item
- **POST** `/api/admin/grocery-items`
  - **Auth Required:** Yes
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "image": "string",
      "category": "string",
      "isActive": "boolean"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Grocery item created successfully.",
      "item": { ... }
    }
    ```

#### Update Grocery Item
- **PUT** `/api/admin/grocery-items/:groceryId`
  - **Auth Required:** Yes
  - **Request Body:** (All fields optional)
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "image": "string",
      "category": "string",
      "isActive": "boolean"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Grocery item updated successfully.",
      "item": { ... }
    }
    ```

#### Toggle Grocery Item Active Status
- **PATCH** `/api/admin/grocery-items/:groceryId/active`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "message": "Grocery item active status updated.",
      "item": { ... }
    }
    ```

#### Delete Grocery Item
- **DELETE** `/api/admin/grocery-items/:groceryId`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "message": "Grocery item deleted successfully."
    }
    ```
  - **Note:** Also deletes associated image from Cloudinary

---

## Kits

### Public Routes

#### Get Active Kits
- **GET** `/api/kits/active`
  - **Response:**
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "image": "string",
        "items": ["array of grocery item IDs"],
        "isActive": true
      }
    ]
    ```

### Admin Routes (Auth Required)

#### Get All Kits (Admin)
- **GET** `/api/admin/kits`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    [
      { ... }
    ]
    ```

#### Get Active Kits Count
- **GET** `/api/admin/kits/active-count`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "count": "number"
    }
    ```

#### Upload Kit Image
- **POST** `/api/admin/kits/upload-image`
  - **Auth Required:** Yes
  - **Content-Type:** `multipart/form-data`
  - **Request:** Form data with `image` file
  - **Response:**
    ```json
    {
      "url": "string (Cloudinary URL)"
    }
    ```

#### Create Kit
- **POST** `/api/admin/kits`
  - **Auth Required:** Yes
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "image": "string",
      "items": ["array of grocery item IDs"],
      "isActive": "boolean"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Kit created successfully.",
      "item": { ... }
    }
    ```

#### Update Kit
- **PUT** `/api/admin/kits/:kitId`
  - **Auth Required:** Yes
  - **Request Body:** (All fields optional)
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "image": "string",
      "items": ["array of grocery item IDs"],
      "isActive": "boolean"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Kit updated successfully.",
      "item": { ... }
    }
    ```

#### Toggle Kit Active Status
- **PATCH** `/api/admin/kits/:kitId/active`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "message": "Kit active status updated.",
      "item": { ... }
    }
    ```

#### Delete Kit
- **DELETE** `/api/admin/kits/:kitId`
  - **Auth Required:** Yes
  - **Response:**
    ```json
    {
      "message": "Kit deleted successfully."
    }
    ```
  - **Note:** Also deletes associated image from Cloudinary

---

## Campaigns

### Public Routes

#### Get Campaign Types
- **GET** `/api/campaigns/types`
  - **Response:**
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "description": "string"
      }
    ]
    ```

#### Upload Campaign Image
- **POST** `/api/campaigns/upload-image`
  - **Content-Type:** `multipart/form-data`
  - **Request:** Form data with `image` file
  - **Response:**
    ```json
    {
      "url": "string (Cloudinary URL)"
    }
    ```

#### Create Campaign
- **POST** `/api/campaigns/create`
  - **Request Body:**
    ```json
    {
      "campaignType": "string (ObjectId)",
      "campaignName": "string",
      "goalAmount": "number",
      "startDate": "number (milliseconds)",
      "endDate": "number (milliseconds)",
      "description": "string",
      "uploadedImage": "string (optional)"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "string",
      "campaignType": "string",
      "campaignName": "string",
      "goalAmount": "number",
      "startDate": "date",
      "endDate": "date",
      "description": "string",
      "uploadedImage": "string",
      "createdAt": "date"
    }
    ```

#### Get Published Campaigns
- **GET** `/api/campaigns/published`
  - **Response:**
    ```json
    [
      {
        "_id": "string",
        "campaignType": { ... },
        "campaignName": "string",
        "goalAmount": "number",
        "startDate": "date",
        "endDate": "date",
        "description": "string",
        "uploadedImage": "string"
      }
    ]
    ```

---

## Payments

### Create Order
- **POST** `/api/payments/create-order`
  - **Request Body:**
    ```json
    {
      "amount": "number (in smallest currency unit)",
      "currency": "string (optional, default: INR)",
      "donationType": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "orderId": "string (Razorpay order ID)"
    }
    ```

### Verify Payment
- **POST** `/api/payments/verify-payment`
  - **Request Body:**
    ```json
    {
      "orderId": "string",
      "paymentId": "string",
      "signature": "string",
      "donationData": {
        "donorName": "string",
        "email": "string",
        "phone": "string",
        "amount": "number",
        "donationType": "string",
        "message": "string (optional)"
      },
      "campaignId": "string (optional)"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Payment verified and donation saved successfully"
    }
    ```
  - **Error:** `400` if signature is invalid

---

## Updates (Admin)

All routes require authentication.

### Get Recent Activities
- **GET** `/api/admin/updates/recent-activity`
  - **Auth Required:** Yes
  - **Query Parameters:**
    - `page` (optional, default: 1)
    - `limit` (optional, default: 7)
    - `activitiesCount` (optional): Total count if already known
  - **Response:**
    ```json
    {
      "activities": [
        {
          "_id": "string",
          "type": "string",
          "description": "string",
          "createdAt": "date"
        }
      ],
      "hasMore": "boolean",
      "totalActivities": "number"
    }
    ```

### Get Recent Donations
- **GET** `/api/admin/updates/recent-donations`
  - **Auth Required:** Yes
  - **Query Parameters:**
    - `page` (optional, default: 1)
    - `limit` (optional, default: 5)
    - `donationsCount` (optional): Total count if already known
  - **Response:**
    ```json
    {
      "donations": [
        {
          "_id": "string",
          "donorName": "string",
          "amount": "number",
          "donationType": "string",
          "email": "string",
          "phone": "string",
          "message": "string",
          "createdAt": "date"
        }
      ],
      "hasMore": "boolean",
      "totalDonations": "number"
    }
    ```

---

## Health Check

### Health Check
- **GET** `/health`
  - **Response:** `OK`
  - **Description:** Simple endpoint to check if the server is running

---

## Notes

### Authentication
- All admin routes (prefixed with `/api/admin/*`) require JWT authentication via HTTP-only cookies
- The token is automatically set in cookies upon successful login
- Token must be included in subsequent requests via cookies

### Request Format
- All POST/PUT/PATCH requests expect JSON bodies unless specified as `multipart/form-data`
- Content-Type header should be `application/json` for JSON requests

### Response Format
- Successful responses return appropriate HTTP status codes (200, 201, etc.)
- Error responses follow the format: `{ error: 'message' }` or `{ message: 'error description' }`

### File Uploads
- Image uploads use `multipart/form-data` encoding
- Images are stored in Cloudinary
- Maximum file size is determined by server configuration (default: 1MB)

### Caching
- Blog endpoints use Redis caching for improved performance
- Cache is automatically invalidated on create/update/delete operations
- Cache TTL is configured in the server settings

### Pagination
- Paginated endpoints accept `page`, `limit`, `skip` query parameters
- Default values are provided for each endpoint
- Responses include pagination metadata where applicable

### Rate Limiting
- All endpoints are protected by rate limiting middleware
- Limits are configured in server settings

### Security
- XSS protection middleware is enabled
- CORS is configured for specific origins (client and admin URLs)
- Security headers are set via security middleware

---

**For more details, refer to the server source code and controller/service files.**
