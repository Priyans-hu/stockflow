# StockFlow - Claude AI Instructions

## Project Overview
StockFlow is a full-stack inventory management system built with MERN stack (MongoDB, Express.js, React, Node.js).

## Tech Stack
- **Backend**: Node.js 18+, Express.js 4.x, MongoDB with Mongoose
- **Frontend**: React 18, TailwindCSS, React Router DOM
- **Auth**: JWT with bcryptjs for password hashing
- **Validation**: express-validator
- **Logging**: morgan

## Project Structure
```
StockFlow/
├── backend/
│   ├── config/         # Database and app configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth, validation middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   └── index.js        # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route page components
│   │   ├── services/   # API service layer
│   │   └── App.js      # Main React app
│   └── package.json
└── README.md
```

## Development Commands
```bash
# Backend
cd backend
npm install
npm run dev          # Start with nodemon

# Frontend
cd frontend
npm install
npm start            # Start React dev server
```

## Environment Variables
Backend requires `.env` file with:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `JWT_EXPIRES_IN` - Token expiration (default: 7d)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## API Endpoints

### Auth (Public)
- `POST /users/register` - Register new user
- `POST /users/login` - Login and get JWT token

### Protected Routes (Require Bearer token)
- `GET /users/profile` - Get current user
- `GET /products` - List all products
- `POST /products` - Create product (Admin/Manager)
- `DELETE /products/:id` - Delete product (Admin only)
- Similar CRUD for: `/categories`, `/orders`, `/transactions`, `/inventory`

### Analytics
- `GET /transactions/analytics/total-turnover` - Get total revenue
- `GET /health` - Health check

## Code Conventions
- Use async/await for async operations
- Validate all inputs using express-validator
- Return consistent JSON responses: `{ message, data, errors }`
- Use MongoDB ObjectId for references
- Frontend uses `_id` field from MongoDB (not `id`)

## Role-Based Access
- **Admin**: Full access to all operations
- **Manager**: Can create/update, cannot delete
- **Staff**: Read-only access

## Testing
When writing tests, use:
- Jest for backend testing
- React Testing Library for frontend
- mongodb-memory-server for isolated DB tests

## Common Tasks

### Adding a New Model
1. Create schema in `backend/models/`
2. Create controller in `backend/controllers/`
3. Create routes in `backend/routes/`
4. Add validation in `backend/middleware/validate.js`
5. Register routes in `backend/index.js`

### Adding a New Frontend Page
1. Create page component in `frontend/src/pages/`
2. Add API methods in `frontend/src/services/api.js`
3. Add route in `frontend/src/App.js`
4. Update navigation in `frontend/src/components/LeftNav.js`
