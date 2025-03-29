# User Management System

A modern user management system built with Next.js, Tailwind CSS, and MongoDB. Features authentication, user CRUD operations, and responsive UI.

## Screenshots

![Login Page](./images/ss1.png) <!-- Add a screenshot if available -->
![Users Page-1](./images/ss2.png)
![Users Page-2](./images/ss3.png)

## Features
- User authentication (Register/Login)
- User profile management
- Responsive UI with dark/light mode
- MongoDB database integration
- JWT-based authentication
- Form validation with Zod
- Modern UI components using shadcn/ui

## Live Deployment

[![Vercel]((https://user-mgmt.vercel.app/))

## Prerequisites

- Node.js v18.x or higher
- MongoDB Atlas account or local MongoDB instance
- pnpm v8.x or higher

## Getting Started

### **1. Clone the repository**

git clone https://github.com/rkd-2004/user-mgmt.git

cd user-mgmt.

### **2. Install dependencies**
pnpm install

### **3. Environment Setup**
Create .env file from example:

cp .env.example .env

Update .env with your credentials:

env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/user-mgmt
JWT_SECRET=your_secure_secret_here

### **4. Run the development server**
pnpm dev

Open http://localhost:3000 in your browser.

## **Assumptions & Considerations**
**Authentication:** Uses JWT with HTTP-only cookies for security

**Styling:** Tailwind CSS with shadcn/ui component library

**Database:** MongoDB Atlas for cloud storage (local MongoDB supported)

**Error Handling:** Basic error boundaries and form validation

**Security:** Environment variables for sensitive data

**Scalability:** Designed for small-medium user bases

## Troubleshooting
**Common Issues:**

**Missing Dependencies:** Run pnpm install --force

**Connection Errors:** Verify MongoDB URI and network access

**Build Errors:** Check Node.js version (requires v18+)

# Clean install:
rm -rf node_modules .next

pnpm install

pnpm build
