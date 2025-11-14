# PPOB API Server

This is the backend REST API server for the PPOB (Payment Platform) application built with Express.js and PostgreSQL.

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run migration:run

# Start development server
npm run dev
# or production: npm start
```

## Project Structure

```
server/
├── src/
│   ├── app.js                  # Express app configuration
│   ├── controllers/            # HTTP request handlers
│   ├── services/               # Business logic
│   ├── repositories/           # Data access layer
│   ├── models/                 # TypeORM entity schemas
│   ├── middleware/             # Express middleware
│   ├── routes/                 # API route definitions
│   ├── utils/                  # Shared utilities
│   └── config/                 # Configuration modules
├── database/
│   ├── data-source.js          # TypeORM data source
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
├── config/
│   ├── database.config.js      # Database configuration
│   ├── swagger.js              # Swagger/OpenAPI config
│   └── env.js                  # Environment variables
├── test/                       # Unit and integration tests
├── server.js                   # Entry point
├── package.json
├── swagger.yaml                # API documentation
└── DATABASE_DDL.sql            # Database schema DDL
```

## Technology Stack

- **Framework:** Express.js 5.1.0
- **ORM:** TypeORM 0.3.27
- **Database:** PostgreSQL
- **Authentication:** JWT with bcrypt
- **Validation:** Joi
- **Testing:** Jest + supertest

## Available Scripts

```bash
# Development
npm run dev                 # Start with auto-reload (nodemon)

# Database
npm run migration:run       # Run migrations
npm run migration:create    # Create new migration
npm run migration:generate  # Generate migration from schema
npm run migration:revert    # Revert last migration
npm run seed                # Seed database

# Testing
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:cov           # With coverage report

# Code Quality
npm run lint               # Lint and fix code

# Production
npm start                  # Run production server
```

## API Documentation

Once the server is running, access the interactive API docs at:
```
http://localhost:3000/api-docs
```

## Environment Variables

See `.env.example` for complete configuration:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ppob_api
JWT_SECRET=your-secret-key
JWT_EXPIRATION=43200s
CORS_ORIGIN=*
```

## API Endpoints

### Authentication
- `POST /api/auth/registration` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get user profile (authenticated)
- `PUT /api/auth/profile/update` - Update profile (authenticated)
- `PUT /api/auth/profile/image` - Upload profile image (authenticated)

### Information
- `GET /api/information/banner` - Get banners (public)
- `GET /api/information/services` - Get services (authenticated)

### Transactions
- `GET /api/transaction/balance` - Check balance (authenticated)
- `POST /api/transaction/topup` - Top-up balance (authenticated)
- `POST /api/transaction/transaction` - Make payment (authenticated)
- `GET /api/transaction/transaction/history` - Transaction history (authenticated)

## Development Guide

See `../CLAUDE.md` for detailed development guidelines including:
- Architecture patterns
- Database design
- API specifications
- Error handling
- Testing approach

## Related Documentation

- **API Specification:** See `../GUIDE-2.md`
- **Implementation Details:** See `../IMPLEMENTATION_GUIDE.md`
- **CLI Client Guide:** See `../CLI_CLIENT_GUIDELINE.md`

## Contributing

Ensure code follows the project standards:
```bash
npm run lint       # Check and fix linting issues
npm test           # Run tests before committing
```

---

For more information, see the project documentation files at the root level.
