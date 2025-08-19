# Assignment Backend

A TypeScript-based REST API backend built with Express.js and MongoDB for content management with user authentication and role-based access control.

## Features

- User authentication (signup/login) with JWT tokens
- Role-based access control (user/admin)
- Content management system with approval workflow
- MongoDB integration with Mongoose ODM
- TypeScript for type safety
- CORS support for cross-origin requests

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Development**: nodemon for hot reloading

## Project Structure

```
src/
├── controllers/     # Request handlers
├── models/         # Database schemas
├── routes/         # API route definitions
├── middleware/     # Custom middleware functions
└── index.ts        # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

## Development

Start the development server with hot reloading:

```bash
npm run dev
```

## Production

Build and start the application:

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Content Management

- `POST /api/content` - Create new content (requires user role)
- `GET /api/content` - Get all contents (requires authentication)
- `PUT /api/content/:id/approve` - Approve content (requires admin role)
- `PUT /api/content/:id/reject` - Reject content (requires admin role)
- `GET /api/content/search` - Search content by title/description (requires admin role)
- `GET /api/content/stats` - Get content statistics (requires admin role)
- `GET /api/content/recent` - Get recent content activity (requires admin role)

#### Content Request Body

```json
{
  "title": "Content Title",
  "description": "Content Description"
}
```

#### Content Response Example

```json
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "title": "My Article",
  "description": "Article description",
  "status": "pending",
  "createdBy": "64f8a1b2c3d4e5f6a7b8c9d1",
  "createdAt": "2023-09-06T10:30:00.000Z"
}
```

#### Content Status Workflow

- **pending**: Default status when content is created
- **approved**: Content approved by admin
- **rejected**: Content rejected by admin

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (default: 3000)

##
