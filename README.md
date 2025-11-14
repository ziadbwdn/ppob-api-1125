# PPOB - Payment Platform API & CLI

A complete Payment Platform solution with backend REST API and command-line interface client.

## Project Structure

```
ppob/
├── server/                      # REST API Backend
│   ├── src/                     # Express.js application code
│   ├── database/                # TypeORM migrations and schema
│   ├── config/                  # Configuration files
│   ├── package.json
│   ├── server.js                # Entry point
│   └── README.md                # Server documentation
│
├── client/                      # CLI Client
│   ├── bin/                     # CLI entry point
│   ├── src/                     # Client application code
│   ├── package.json
│   └── README.md                # Client documentation
│
├── Documentation/
│   ├── CLAUDE.md                # Development guidelines
│   ├── GUIDE.md                 # Project overview
│   ├── GUIDE-2.md               # API specification
│   ├── CLI_CLIENT_GUIDELINE.md  # CLI MVP specification
│   ├── IMPLEMENTATION_GUIDE.md  # Implementation details
│   └── README_IMPLEMENTATION.md # Complete setup guide
│
└── .git/                        # Version control
```

## Quick Start

### Backend Server

```bash
cd server
npm install
cp .env.example .env
npm run migration:run
npm run dev
```

Server runs on: `http://localhost:3000`
API Docs: `http://localhost:3000/api-docs`

### CLI Client (Coming Soon)

```bash
cd client
npm install
npx ppob-cli auth login -e user@example.com
ppob-cli account balance
```

## What is PPOB?

**PPOB (Payment Platform)** provides:

- ✅ User authentication with JWT
- ✅ Account balance management
- ✅ Service payment processing
- ✅ Transaction history tracking
- ✅ Profile management
- ✅ Promotional banners and service listings

## Key Features

### Backend API
- RESTful API with Express.js
- PostgreSQL database with TypeORM ORM
- JWT-based authentication
- Raw SQL prepared statements for security
- Comprehensive error handling
- Swagger/OpenAPI documentation
- Jest unit and integration tests

### CLI Client (MVP)
- Command-line interface for payment operations
- Interactive and script-friendly modes
- Multiple output formats (JSON, table, CSV)
- Token-based session management
- Comprehensive help and error messages

## Technology Stack

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Node.js | 18+ |
| Framework | Express.js | 5.1.0 |
| ORM | TypeORM | 0.3.27 |
| Database | PostgreSQL | 12+ |
| Auth | JWT + bcrypt | 9.0.2, 6.0.0 |
| Testing | Jest + supertest | 30.2.0, 7.1.4 |

### Client
| Component | Technology | Version |
|-----------|-----------|---------|
| Runtime | Node.js | 18+ |
| CLI | Commander.js | 11.0.0+ |
| HTTP | Axios | 1.6.0+ |
| UI | Chalk, cli-table3 | 5.0.0+, 0.6.0+ |

## Documentation

### Getting Started
- **Backend:** See `server/README.md`
- **Client:** See `client/README.md`
- **Complete Setup:** See `README_IMPLEMENTATION.md`

### Development
- **Guidelines:** See `CLAUDE.md`
- **API Spec:** See `GUIDE-2.md`
- **CLI Spec:** See `CLI_CLIENT_GUIDELINE.md`

### Database
- **Schema DDL:** See `server/DATABASE_DDL.sql`
- **Migrations:** See `server/database/migrations/`

## Development Commands

### Backend
```bash
cd server

# Installation
npm install

# Development
npm run dev              # Auto-reload server

# Database
npm run migration:run    # Apply migrations
npm run seed             # Seed database

# Testing
npm test                 # Run tests
npm run test:cov         # Coverage report

# Code Quality
npm run lint             # Lint and fix
```

### Client
```bash
cd client

# Installation
npm install

# Development
npm run dev

# Testing
npm test

# Build
npm run build
npm link                 # Make globally available
```

## API Endpoints Overview

See `GUIDE-2.md` for complete specification.

### Authentication
- `POST /api/auth/registration` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (protected)
- `PUT /api/auth/profile/update` - Update profile (protected)
- `PUT /api/auth/profile/image` - Update image (protected)

### Services
- `GET /api/information/banner` - Get banners (public)
- `GET /api/information/services` - Get services (protected)

### Transactions
- `GET /api/transaction/balance` - Get balance (protected)
- `POST /api/transaction/topup` - Top-up balance (protected)
- `POST /api/transaction/transaction` - Make payment (protected)
- `GET /api/transaction/transaction/history` - Transaction history (protected)

## Project Status

- ✅ **Backend:** Complete & tested
- 🚧 **Client:** MVP specification ready (in development)
- 📋 **Documentation:** Comprehensive guides available

## Contributing

1. Follow guidelines in `CLAUDE.md`
2. Write tests for new features
3. Run `npm run lint` before committing
4. Update documentation as needed

## License

ISC
