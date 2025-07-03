Client

This is the user-facing frontend for the Hare Krishna Vidya project, a platform enabling donors, campaigners, and job seekers to interact with the NGO and support its mission.

---

## 🌟 Features

- Donate money (Annadaan, Vidyadaan, Sponsor a Child)
- Donate items (Donation Kits, Groceries)
- Create and view fundraising campaigns
- Paginated blog and updates section
- Paginated careers/jobs section
- Transparent donation progress and impact
- Responsive, accessible UI
- Blog subscription and notifications

---

## 🛠️ Tech Stack

- **React** (with Vite)
- **TypeScript** (for type safety and maintainability)
- **Tailwind CSS** (utility-first styling)
- **Framer Motion** (animations and transitions)
- **Radix UI** (accessible UI primitives)
- **Zod** (schema validation)
- **React Hook Form** (form management)
- **Axios** (API requests)
- **React Router** (routing)
- **TanStack React Query** (data fetching and caching)

---

## 📂 Project Structure
```
client/
├── public/                  # Static assets (images, icons, favicon, etc.)
│   └── assets/
├── src/
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   ├── components/         # Reusable UI and common components
│   ├── contexts/           # React context providers
│   ├── lib/                # Utility functions and helpers
│   ├── pages/              # Page components (donate, blogs, careers, etc.)
│   ├── styles/             # Tailwind and global CSS
│   ├── api/                # Axios instance and API helpers
│   └── TSX-src/            # TypeScript/TSX components and utilities
├── index.html              # HTML template
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration for Tailwind
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── vercel.json             # Vercel deployment configuration

```
---

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)  
  Node.js is required to run the development server, build the project, and manage dependencies.
- **npm** (comes with Node.js)

### Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   ```sh
   Copy .env.example to .env and fill in the required values 
   ```

3. **Start the development server:**
    ```sh
    npm run dev
    ```

4. **Build for production:**
    ```sh
    npm run build
    ```


### 🛡️ Security & Best Practices
 - All sensitive data is handled securely; no secrets are exposed in the frontend.
 - Input validation and sanitization are enforced on forms.
 - Uses HTTPS for all API and payment requests in production.

