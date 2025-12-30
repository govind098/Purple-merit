# Quick Start Guide

## Getting Started with the Full Stack Application

### Prerequisites Installation
1. Install Node.js from https://nodejs.org/ (v14 or higher)
2. Install MongoDB:
   - **Windows**: Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Step 1: Clone/Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already created, but check it)
# Content should be:
# MONGODB_URI=mongodb://localhost:27017/full_stack_app
# JWT_SECRET=your_jwt_secret_key_change_in_production
# PORT=5000
# NODE_ENV=development

# Start backend server
npm run dev
```

Backend will be running on: **http://localhost:5000**

### Step 2: Setup Frontend (in another terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

Frontend will be running on: **http://localhost:3000**

## Testing the Application

### Run Backend Tests
```bash
cd backend
npm test
```

This will run 26 unit tests covering:
- Email and password validation
- JWT token generation and verification
- User model behavior
- Authentication middleware protection
- Admin access control

### Manual Testing Steps

1. **Register a New User**
   - Go to http://localhost:3000/signup
   - Fill in: Full Name, Email, Password, Confirm Password
   - Click Sign Up
   - Should redirect to Login page

2. **Login**
   - Go to http://localhost:3000/login
   - Enter email and password
   - Click Login
   - Should redirect to Profile page

3. **View Profile**
   - On Profile page, see your information
   - Edit Full Name and Email
   - Change Password
   - Click Save/Update buttons

4. **Test Admin Features** (requires admin user)
   - Create a second user account
   - Manually change user role in MongoDB to 'admin':
     ```
     db.users.updateOne(
       { email: "admin@example.com" },
       { $set: { role: "admin" } }
     )
     ```
   - Login with admin account
   - Access Admin Dashboard from Navigation
   - View all users (paginated)
   - Activate/Deactivate users

## Database Setup

### Using Local MongoDB

1. Start MongoDB service:
   ```bash
   # Windows (if installed)
   mongod
   ```

2. MongoDB will be available at: `mongodb://localhost:27017`

### Using MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get connection string
4. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/full_stack_app
   ```

## API Endpoints Reference

### Authentication (No Auth Required)
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login and get token

### Authentication (Auth Required)
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout

### User Profile (Auth Required)
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile/:id` - Update profile
- `PUT /api/users/change-password/:id` - Change password

### Admin Only (Auth + Admin Role Required)
- `GET /api/users?page=1&limit=10` - List all users with pagination
- `PUT /api/users/activate/:id` - Activate a user
- `PUT /api/users/deactivate/:id` - Deactivate a user

## Troubleshooting

### Port Already in Use
```bash
# Find process on port 5000 (backend)
netstat -ano | findstr :5000

# Find process on port 3000 (frontend)
netstat -ano | findstr :3000

# Kill the process (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service or update MONGODB_URI in .env

### CORS Error in Frontend
**Cause**: Backend not running or on wrong port
**Solution**: Ensure backend is running on http://localhost:5000

### Password Validation Error
Password must have:
- At least 6 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

Example valid password: `Password123`

## Features Overview

### User Features
✅ Sign up with email and password
✅ Login with credentials
✅ View own profile
✅ Edit full name and email
✅ Change password
✅ Logout

### Admin Features
✅ View all users (paginated, 10 per page)
✅ Activate user accounts
✅ Deactivate user accounts
✅ Role-based access control

### Security Features
✅ Password hashing with bcrypt
✅ JWT-based authentication
✅ Protected routes
✅ Input validation
✅ Email format validation
✅ Password strength validation
✅ Role-based authorization

## Project Structure

```
full_Stack_porject/
├── backend/                    # Node.js/Express API
│   ├── __tests__/             # Unit tests
│   ├── config/                # Database configuration
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth middleware
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── utils/                 # Helpers (JWT, validators)
│   ├── .env                   # Environment variables
│   ├── server.js              # Express app
│   └── package.json
│
└── frontend/                   # React/Vite app
    ├── src/
    │   ├── components/        # Reusable components
    │   ├── pages/             # Page components
    │   ├── services/          # API calls
    │   ├── styles/            # CSS files
    │   ├── App.jsx            # Main app
    │   └── main.jsx           # Entry point
    └── package.json
```

## Common Commands

### Backend
```bash
npm run dev       # Start with hot reload
npm test          # Run tests
npm start         # Start production server
```

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Create production build
npm run preview   # Preview production build
```

## Support

For issues or questions:
1. Check this guide first
2. Check the README.md file
3. Verify backend is running
4. Check browser console for errors
5. Check terminal for error messages

Happy coding! 🚀
