# Authentication Setup Guide

## Overview
The authentication system uses:
- **Backend**: JWT tokens, bcrypt for password hashing, MongoDB for user storage
- **Frontend**: Zod for form validation, TanStack Query for API calls
- **Security**: Password hashing, JWT tokens with expiration

## Setup Instructions

### 1. Create First Admin User

Run the following command to create the default admin user:

```bash
pnpm create-admin
```

**Default Credentials:**
- Email: `admin@marinarental.com`
- Password: `admin123`

⚠️ **Important**: Change the password after first login!

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000

# Next.js API URL (for frontend)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. API Endpoints

#### Authentication Routes (`/api/auth`)

- **POST `/api/auth/register`** - Register new admin (optional, can be disabled)
  ```json
  {
    "name": "Admin Name",
    "email": "admin@example.com",
    "password": "password123"
  }
  ```

- **POST `/api/auth/login`** - Login
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
  Returns:
  ```json
  {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "Admin Name",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```

- **GET `/api/auth/verify`** - Verify token
  Headers: `Authorization: Bearer <token>`

## Frontend Usage

### Login Page
The login page (`/admin/login`) includes:
- ✅ Zod form validation
- ✅ TanStack Query for API calls
- ✅ Real-time error handling
- ✅ Password visibility toggle

### Protected Routes
All `/admin/*` routes are protected. The `AdminLayout` component:
- Automatically redirects to login if not authenticated
- Verifies token on page load
- Shows user information in sidebar
- Provides logout functionality

### Using Auth Hook

```javascript
import { useAuth, useLogin } from '@/hooks/useAuth';

// In your component
const { user, isAuthenticated, logout } = useAuth();
const loginMutation = useLogin();

// Login
loginMutation.mutate({ email, password });
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Tokens**: Secure token-based authentication
3. **Token Expiration**: Tokens expire after 7 days
4. **Input Validation**: Zod schema validation on frontend
5. **Protected Routes**: Middleware protects admin routes

## File Structure

```
server/
├── models/
│   └── User.js              # User model with password hashing
├── routes/
│   └── auth.js              # Authentication routes
├── middleware/
│   └── auth.js              # JWT authentication middleware
└── scripts/
    └── createAdmin.js       # Script to create first admin

src/
├── lib/
│   └── auth.js              # Auth utility functions
├── hooks/
│   └── useAuth.js           # React hooks for authentication
└── app/
    └── admin/
        └── login/
            └── page.js      # Login page with Zod + TanStack Query
```

## Next Steps

1. Set up environment variables
2. Run `pnpm create-admin` to create first admin
3. Start backend: `pnpm server:dev`
4. Start frontend: `pnpm dev`
5. Login at `/admin/login`
6. Change default password!

