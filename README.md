<<<<<<< HEAD
# Full Stack Web Application

A complete full-stack web application with React frontend, Node.js/Express backend, and MongoDB database. Includes user authentication, user management, admin dashboard, and role-based access control.

## Features

### Backend
- **Authentication**: User signup/login with JWT tokens
- **User Management**: Profile viewing, editing, password changes
- **Admin Features**: View all users with pagination, activate/deactivate users
- **Security**: Password hashing with bcrypt, input validation, role-based access control
- **API**: RESTful API with proper error handling and status codes

### Frontend
- **Authentication Pages**: Login and signup with client-side validation
- **User Dashboard**: View and edit profile, change password
- **Admin Dashboard**: Manage users with pagination, activate/deactivate functionality
- **Protected Routes**: Unauthorized access prevention
- **Responsive Design**: Works on desktop and mobile devices
- **Toast Notifications**: Success/error messages

## Project Structure

```
full_Stack_porject/
├── backend/
│   ├── __tests__/
│   │   ├── auth.middleware.test.js
│   │   ├── jwt.test.js
│   │   ├── user.model.test.js
│   │   └── validators.test.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── utils/
│   │   ├── jwt.js
│   │   └── validators.js
│   ├── .env
│   ├── .gitignore
│   ├── jest.config.js
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── NavBar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Profile.jsx
    │   │   └── AdminDashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── globals.css
    │   │   ├── auth.css
    │   │   ├── navbar.css
    │   │   ├── profile.css
    │   │   └── admin-dashboard.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── .gitignore
    ├── vite.config.js
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following configuration:
```env
MONGODB_URI=mongodb://localhost:27017/full_stack_app
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout user (requires auth)

### Users
- `GET /api/users?page=1&limit=10` - Get all users (admin only)
- `GET /api/users/profile/:id` - Get user profile (requires auth)
- `PUT /api/users/profile/:id` - Update user profile (requires auth)
- `PUT /api/users/change-password/:id` - Change password (requires auth)
- `PUT /api/users/activate/:id` - Activate user (admin only)
- `PUT /api/users/deactivate/:id` - Deactivate user (admin only)

## Testing

Run backend unit tests:

```bash
cd backend
npm test
```

The test suite includes:
- Email and password validation tests
- JWT token generation and verification tests
- User model tests
- Authentication middleware tests

## Default Users

The application comes with no default users. You need to create them through the signup process.

To test admin features:
1. Create two user accounts
2. Manually set the second user's role to 'admin' in MongoDB
3. Login with the admin account to access the dashboard

## Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

### Frontend
- API URL is configured to `http://localhost:5000/api` in development

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Email format and password strength validation
- **Role-Based Access Control**: Admin-only endpoints
- **Protected Routes**: Unauthorized users redirected to login
- **Environment Variables**: Sensitive data stored in .env files

## Password Requirements

- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Error Handling

All API responses follow a consistent format:

Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

Error Response:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Development

### Backend Development
- Uses Express.js for the REST API
- Mongoose for MongoDB object modeling
- Nodemon for automatic server restart during development

### Frontend Development
- Uses React with Vite as the build tool
- React Router for client-side routing
- Axios for HTTP requests
- CSS Modules for styling

## Deployment

### Backend Deployment
1. Set environment variables on the production server
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server

### Frontend Deployment
1. Run `npm run build` to create a production build
2. Deploy the `dist` folder to a static hosting service

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or update the MONGODB_URI to your MongoDB Atlas connection string
- Check that the connection string is correct in `.env`

### CORS Error
- Ensure the backend is running on port 5000
- Check that CORS is properly configured in the Express server

### Port Already in Use
- Change the PORT in backend/.env or the port in frontend/vite.config.js
- Or kill the process using the port

## License

MIT License - feel free to use this project for any purpose.
=======
# Purple-merit
>>>>>>> c29403c0353ac02ef9e865c445866ba9277f8c02
