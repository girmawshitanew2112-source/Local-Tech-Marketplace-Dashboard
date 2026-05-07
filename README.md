# Local Tech Marketplace Dashboard

A production-ready full-stack marketplace starter where local buyers, sellers, and admins can manage technology products, services, orders, messaging, notifications, and dashboard analytics.

## Stack

- **Frontend:** React, React Router, Context API, Recharts, Axios, Vite
- **Backend:** Node.js, Express, JWT, Multer, Mongoose
- **Database:** MongoDB

## Features

- Role-based authentication for admins, sellers, and buyers
- Responsive dashboard UI with sidebar, top navigation, cards, charts, dark/light mode, and animated states
- Product CRUD with image upload, categories, filtering, search, sorting, and pagination
- Order management with payment simulation and delivery status tracking
- Buyer cart, wishlist, checkout, and order history
- Seller sales metrics and product management
- Admin analytics for users, products, orders, revenue, and marketplace activity
- Messages and real-time-ready notifications APIs
- Seed data for local testing

## Project Structure

```text
backend/   Express API, MVC controllers, Mongoose models, middleware, routes, seed data
frontend/  React application, reusable components, pages, hooks/context, services, utilities
```

## Getting Started

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

Copy the examples and update values as needed:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Run MongoDB

Use a local MongoDB instance or MongoDB Atlas and set `MONGO_URI` in `backend/.env`.

### 4. Seed demo data

```bash
npm run seed
```

Demo accounts use password `password123`:

- `admin@localtech.dev` / admin
- `seller@localtech.dev` / seller
- `buyer@localtech.dev` / buyer

### 5. Start development servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Overview

| Resource | Routes |
| --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Users | `GET /api/users`, `GET /api/users/:id`, `PATCH /api/users/:id`, `DELETE /api/users/:id` |
| Products | `GET /api/products`, `POST /api/products`, `GET /api/products/:id`, `PATCH /api/products/:id`, `DELETE /api/products/:id` |
| Orders | `GET /api/orders`, `POST /api/orders`, `GET /api/orders/:id`, `PATCH /api/orders/:id/status` |
| Messages | `GET /api/messages`, `POST /api/messages`, `PATCH /api/messages/:id/read` |
| Notifications | `GET /api/notifications`, `POST /api/notifications`, `PATCH /api/notifications/:id/read` |
| Analytics | `GET /api/analytics/overview`, `GET /api/analytics/seller` |

## Production Notes

- Set a strong `JWT_SECRET`.
- Restrict `CLIENT_URL` to your deployed frontend domain.
- Serve uploaded assets from durable object storage for production.
- Run behind HTTPS and a reverse proxy.
- Add payment-provider SDK calls where the current demo payment simulation is implemented.
