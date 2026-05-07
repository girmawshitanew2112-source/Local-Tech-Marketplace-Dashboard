# Local Tech Marketplace Dashboard

A production-minded full-stack marketplace for local technology products and services. It includes a React dashboard UI, Express REST API, MongoDB/Mongoose data layer, JWT authentication, role-based access, image upload support, analytics, messaging, notifications, delivery tracking, and seed data.

## Tech Stack

- **Frontend:** JavaScript, React, React Router, Context API, Recharts, Socket.IO client, responsive CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Helmet, CORS, rate limiting, Socket.IO
- **Architecture:** Separate `frontend` and `backend` workspaces with MVC-style backend folders

## Features

- Admin, seller, and buyer dashboard views
- Dark/light mode and mobile-friendly dashboard layout
- Product listing cards, advanced filter UI, reusable components, charts, and KPI cards
- Secure register/login endpoints with password hashing and JWT issuance
- Role-based CRUD for users, products, and orders
- Product image upload support via Multer
- Search, filtering, sorting, and pagination for products
- Simulated payment flow and delivery tracking events
- Real-time-ready messaging and notification APIs using Socket.IO
- Seed data for demo admin, seller, and buyer accounts

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

```bash
npm install
```

Copy environment examples and update values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Seed demo data:

```bash
npm run seed
```

Run both apps:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

Demo accounts use password `password123`:

- `admin@localtech.dev`
- `seller@localtech.dev`
- `buyer@localtech.dev`

## API Overview

| Method | Route | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Create account | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |
| GET | `/api/auth/me` | Current user | User |
| GET | `/api/products` | Search/filter/paginate products | Public |
| POST | `/api/products` | Create product with images | Seller/Admin |
| PUT | `/api/products/:id` | Update product | Owner/Admin |
| DELETE | `/api/products/:id` | Delete product | Owner/Admin |
| GET | `/api/orders` | Role-aware orders | User |
| POST | `/api/orders` | Simulate checkout/payment | Buyer/Admin |
| PATCH | `/api/orders/:id/delivery` | Update delivery status | Seller/Admin |
| GET | `/api/users/analytics` | Marketplace analytics | Admin/Seller |
| GET/POST | `/api/messages` | Messaging threads and send | User |
| GET | `/api/messages/notifications` | Notifications | User |

## Production Notes

- Set a strong `JWT_SECRET` and lock down `CLIENT_URL`.
- Serve uploaded files from durable object storage in production.
- Add a real payment provider in place of the simulated payment status.
- Run behind HTTPS and a reverse proxy with request/body size limits.
