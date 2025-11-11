# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **User Management Service** built with Express.js, TypeORM, and PostgreSQL. It's a backend REST API that handles user authentication, profile management, and user CRUD operations. The service implements JWT-based authentication with password hashing and follows a layered architecture pattern.

## Technology Stack

- **Framework:** Express.js v5.1.0 (Node.js, CommonJS modules)
- **ORM:** TypeORM v0.3.27 (EntitySchema pattern, not decorators)
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken v9.0.2) with bcrypt v6.0.0 hashing
- **Input Validation:** Joi v18.0.1
- **Testing:** Jest v30.2.0 with supertest v7.1.4
- **Code Quality:** ESLint v9.39.1

## Build, Test, and Run Commands

**Development:**
```bash
npm install              # Install dependencies
npm run dev             # Start with auto-reload (nodemon, port 3000)
```

**Setup:**
```bash
npm run migration:run   # Run database migrations to set up schema
```

**Testing:**
```bash
npm test                # Run all tests once
npm run test:watch      # Run tests in watch mode
npm run test:cov        # Run tests with coverage report
```

**Code Quality:**
```bash
npm run lint            # Lint and auto-fix code style
```

**Production:**
```bash
npm start               # Run production build (node server.js)
```

**Database Migrations** (TypeORM):
```bash
npm run migration:create <migration-name>  # Create new migration
npm run migration:generate <migration-name> # Generate migration from schema changes
npm run migration:revert                   # Revert last migration
```

## Architecture & Codebase Structure

The application follows a **layered (N-tier) architecture** for clean separation of concerns:

```
src/
├── controllers/     - HTTP request handlers, input validation
├── services/        - Core business logic
├── repositories/    - Data access layer (TypeORM QueryBuilder)
├── models/          - TypeORM entity schemas (User, Profile)
├── middleware/      - Express middleware (auth, error handling)
├── routes/          - API route definitions
└── utils/           - Shared utilities (validators, response formatting, password hashing)
```

**Key Architectural Patterns:**

1. **Controllers** handle HTTP request/response and delegate to services
2. **Services** contain business logic and error handling
3. **Repositories** abstract database queries using TypeORM QueryBuilder
4. **Models** define entity schemas with TypeORM EntitySchema (not decorators)
5. **Middleware** handles JWT authentication and global error handling
6. **Validators** use Joi for declarative schema validation

**Entity Relationships:**
- User (1) ←→ (1) Profile - One-to-one relationship with CASCADE delete
- User: id (UUID), email (unique), username (unique), password, isActive, timestamps
- Profile: id (UUID), userId (unique FK), firstName, lastName, phone, address, dateOfBirth, bio, timestamps

## Database Setup

**Configuration:**
- File: `config/database.config.js` with environment-specific settings
- DataSource: `database/data-source.js` initializes TypeORM connection
- Development: SQL logging enabled, schema not auto-synced
- Test: Database auto-synced, separate test database
- Production: SQL logging disabled, schema not auto-synced

**Migrations:**
- Located in `database/migrations/`
- Must run `npm run migration:run` after setup
- Each migration is timestamped and handles schema changes

**Environment Variables** (see `.env.example`):
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=user_management
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=3600s
```

## Input Validation

Validation schemas are defined in `src/utils/validators.js` using Joi:

- **Registration/Login:** email format, password (min 8 chars, must include uppercase, lowercase, digit), username
- **User CRUD:** partial field updates allowed
- **Profile CRUD:** userId, firstName, lastName, phone, address, dateOfBirth, bio
- Validation errors include all failures (using `abortEarly: false`)

## Error Handling

**Custom Error Pattern:**
- Errors have `statusCode` property for HTTP response mapping
- PostgreSQL errors handled specifically (e.g., unique constraint violations = 409 Conflict)
- JWT errors (expiration, invalid token) return 401 Unauthorized
- Global error handler middleware catches all errors as last middleware

**Error Response Format:**
- Controllers throw errors with statusCode
- Global middleware in `src/middleware/errorHandler.js` formats response

## API Endpoints

**Authentication (Public):**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login, returns JWT token

**Authenticated Endpoints (require Bearer token):**
- `GET /api/auth/profile` - Get current user's profile
- `GET /api/users`, `GET /api/users/:id`, `POST /api/users`, `PATCH /api/users/:id`, `DELETE /api/users/:id` - User CRUD
- `GET /api/profiles`, `GET /api/profiles/:id`, `POST /api/profiles`, `PATCH /api/profiles/:id`, `DELETE /api/profiles/:id` - Profile CRUD

**Health Check:**
- `GET /health` - Server status

## Key Implementation Details

1. **JWT Authentication** (`src/middleware/authMiddleware.js`):
   - Validates Bearer tokens using JWT_SECRET
   - Attaches decoded token to `req.user`
   - Returns 401 if invalid/expired

2. **Password Security** (`src/utils/hash.js`):
   - Uses bcrypt with 10 salt rounds
   - Hash comparison for login validation

3. **Response Formatting** (`src/utils/response.js`):
   - Consistent API response structure across all endpoints
   - Includes statusCode, data, and error messages

4. **Service Layer Pattern:**
   - Services are singletons that encapsulate business logic
   - Repositories injected as dependencies
   - Throw custom errors for error handling

5. **Entry Point** (`server.js`):
   - Loads .env file via dotenv
   - Initializes database connection async
   - Starts Express server with error handling

## Testing

- Test files in `test/` directory using Jest
- Tests use mocking for external dependencies
- Coverage available via `npm run test:cov`
- Use supertest for HTTP endpoint testing

## Complete API Specification

Detailed API requirements and response formats are in `GUIDE-2.md`, including:
- Exact field names and response schemas
- Validation rules
- Status codes for each endpoint
- Bearer token requirements
- Example requests/responses

## Common Development Patterns

**Adding a New API Endpoint:**
1. Create Joi schema in `src/utils/validators.js`
2. Add controller method in `src/controllers/`
3. Add service method in `src/services/`
4. Add repository method in `src/repositories/` if database query needed
5. Define route in `src/routes/` and add to `src/routes/index.js`
6. Test with appropriate protection (auth middleware) based on requirements

**Modifying Database Schema:**
1. Update entity definition in `src/models/`
2. Run `npm run migration:generate MigrationName` to auto-generate migration
3. Review migration in `database/migrations/`
4. Run `npm run migration:run` to apply

**Debugging:**
- Development logs include SQL queries (database logging enabled)
- Use `npm run dev` to auto-reload on file changes
- Check `.env` file is properly configured before running
