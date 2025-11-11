# User Management Service

This is a User Management Service built with Express.js, TypeORM, and PostgreSQL.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file and populate it with your database credentials (see `.env.example`)
4. Run database migrations: `npm run migration:run`

### Running the application

- Development: `npm run dev`
- Production: `npm run start`

### Running tests

- `npm test`

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get the profile of the currently logged in user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `POST /api/users` - Create a new user
- `PATCH /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `GET /api/profiles` - Get all profiles
- `GET /api/profiles/:id` - Get a profile by ID
- `POST /api/profiles` - Create a new profile
- `PATCH /api/profiles/:id` - Update a profile
- `DELETE /api/profiles/:id` - Delete a profile
