# StockFlow Inventory Management System

A modern, full-stack inventory management system built with the MERN stack. Manage products, track inventory, process orders, and analyze transactions with ease.

## Features

- **User Authentication** - JWT-based auth with role-based access control
- **Product Management** - CRUD operations with categories and SKU tracking
- **Order Management** - Create and manage purchase orders
- **Transaction Tracking** - Monitor all transactions with analytics
- **Dashboard** - Real-time metrics and recent activity overview
- **Role-Based Access** - Admin, Manager, and Staff permission levels

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TailwindCSS, React Router |
| Backend | Node.js 18+, Express.js 4.x |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT with bcryptjs |
| Validation | express-validator |
| Logging | morgan |

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/Priyans-hu/StockFlow.git
cd StockFlow

# Backend setup
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### Environment Variables

Create `backend/.env` with:

```env
MONGODB_URI=mongodb://localhost:27017/stockflow
JWT_SECRET=your-secret-key-min-32-characters
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /users/register | Register new user |
| POST | /users/login | Login and get token |
| GET | /users/profile | Get current user |

### Products
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /products | All users |
| POST | /products | Admin/Manager |
| PUT | /products/:id | Admin/Manager |
| DELETE | /products/:id | Admin only |

### Other Resources
Similar CRUD endpoints for `/categories`, `/orders`, `/transactions`, `/inventory`

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /transactions/analytics/total-turnover | Total revenue |
| GET | /health | Health check |

## Project Structure

```
StockFlow/
├── backend/
│   ├── config/         # Database config
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth, validation
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── index.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI
│   │   ├── pages/      # Route pages
│   │   ├── services/   # API layer
│   │   └── App.js      # Main app
│   └── package.json
├── CLAUDE.md           # AI assistance guide
├── llms.txt            # AI discoverability
└── .cursorrules        # Cursor IDE config
```

## Use Cases

- **Retail Businesses** - Track inventory, manage orders
- **Warehouses** - Monitor stock levels, optimize restocking
- **E-commerce** - Manage product listings, process orders
- **Small Businesses** - Simple inventory tracking

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

Found a vulnerability? Please see [SECURITY.md](SECURITY.md) for reporting guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Author

**Priyanshu Garg** - [GitHub](https://github.com/Priyans-hu)
