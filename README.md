## Samvasta Multi-Portal Backend (TypeScript)

This is a Node.js + Express + Prisma backend that powers two portals sharing a single PostgreSQL database:

- **Chalkboard**: public student/parent + marketplace portal
- **Samavest ERP**: internal ERP portal for staff departments

It provides JWT-based authentication, role-based access control, and a modular service-oriented architecture.

### Tech stack

- Node.js, TypeScript, Express
- Prisma ORM (PostgreSQL)
- JWT auth + bcrypt password hashing

### Running locally

1. **Install dependencies** (already done if you followed the assistant steps):

```bash
npm install
```

2. **Configure environment** in `.env`:

- `DATABASE_URL` – PostgreSQL URL (Prisma 7-style; the template value works if you use `npx prisma dev`)
- `JWT_SECRET` – secret string for signing tokens
- `BCRYPT_ROUNDS` – optional, default `10`
- `PORT` – optional, default `3000`

3. **Generate Prisma client** (after any schema changes):

```bash
npx prisma generate
```

4. **Run database migrations** (once you define your own migration plan):

```bash
npx prisma migrate dev --name init
```

5. **Start the dev server**:

```bash
npm run dev
```

or build and run:

```bash
npm run build
npm start
```

The API will be available on `http://localhost:3000` by default.

### Key routes

- **Auth**
  - `POST /api/auth/login` – login with `email` and `password`, returns JWT and user info.

- **Chalkboard portal (students/parents/teachers)**
  - `GET /api/chalkboard/me/profile` – protected; requires `STUDENT` or `PARENT` role.
  - `GET /api/chalkboard/reports/...` - Report cards, attendance, fee reports.
  - `GET /api/chalkboard/homework/...` - Homework assignments and submissions.
  - `GET /api/chalkboard/parents/...` - Parent dashboard data.

- **Samavest ERP portal (staff/admin)**
  - `GET /api/samavest/admin/analytics` – System-wide analytics and enrollment trends.
  - `GET /api/samavest/orders` - Order management and status updates.
  - `GET /api/samavest/inventory` - Inventory tracking and low-stock alerts.
  - `GET /api/samavest/logistics` - Shipment tracking.
  - `GET /api/samavest/production` - Production batch logging.

### Structure overview

- `src/app.ts` – Express wiring, middleware, and mounted routers.
- `src/server.ts` – app bootstrap.
- `src/config/env.ts` – environment loading and typed config.
- `src/config/db.ts` – Prisma client singleton.
- `src/middleware/auth.ts` – JWT authentication middleware.
- `src/middleware/roles.ts` – role-based authorization guards.
- `src/middleware/errorHandler.ts` – central error handler.
- `src/shared/utils/jwt.ts` – JWT helper functions.
- `src/shared/utils/password.ts` – bcrypt helpers.
- `src/modules/auth/*` – auth service, controller, routes.
- `src/portals/chalkboard/routes.ts` – Chalkboard-specific route mounting.
- `src/portals/samavest/routes.ts` – Samavest (ERP)-specific route mounting.
- `src/modules/admin/*` - Admin user management and analytics.
- `src/modules/reports/*` - Reporting engine for students, classes, and financial data.
- `src/modules/homework/*` - Homework management system.
- `src/modules/parents/*` - Parent portal functionality.

From here, extend `src/modules` with concrete controllers/services for students, products, orders, inventory, logistics, and payments, and expose them via the appropriate portal routers with `authenticateJWT` and `requireRoles` guards.

