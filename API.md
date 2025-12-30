# API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication
Authentication uses JWT (JSON Web Tokens). Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "token": "jwt_token_if_applicable",
  "user": {...},
  "users": [...],
  "pagination": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Authentication Endpoints

### Register User
**POST** `/auth/signup`

**Request Body**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response** (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

**Validation Errors**
- Email format invalid
- Email already in use
- Password too short (< 6 characters)
- Password missing uppercase letter
- Password missing lowercase letter
- Password missing number
- Passwords don't match
- Missing required fields

---

### Login User
**POST** `/auth/login`

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "lastLogin": "2024-12-30T10:30:00.000Z"
  }
}
```

**Error Cases**
- 400: Missing email or password
- 401: Invalid credentials
- 403: Account deactivated

---

### Get Current User
**GET** `/auth/me`

**Headers**
```
Authorization: Bearer <token>
```

**Response** (200 OK)
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

**Error Cases**
- 401: No token or invalid token

---

### Logout User
**POST** `/auth/logout`

**Headers**
```
Authorization: Bearer <token>
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## User Endpoints

### Get All Users (Admin Only)
**GET** `/users?page=1&limit=10`

**Headers**
```
Authorization: Bearer <token>
```

**Query Parameters**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Results per page

**Response** (200 OK)
```json
{
  "success": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2024-12-30T10:30:00.000Z",
      "createdAt": "2024-12-29T10:30:00.000Z"
    },
    ...
  ],
  "pagination": {
    "total": 50,
    "pages": 5,
    "currentPage": 1,
    "limit": 10
  }
}
```

**Error Cases**
- 401: No token or invalid token
- 403: User is not admin

---

### Get User Profile
**GET** `/users/profile/:id`

**Parameters**
- `id` - User ID (MongoDB ObjectId)

**Headers**
```
Authorization: Bearer <token>
```

**Response** (200 OK)
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

**Error Cases**
- 401: No token
- 403: Not authorized to view this profile
- 404: User not found

---

### Update User Profile
**PUT** `/users/profile/:id`

**Parameters**
- `id` - User ID

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "fullName": "John Smith",
  "email": "john.smith@example.com"
}
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Smith",
    "email": "john.smith@example.com",
    "role": "user",
    "status": "active"
  }
}
```

**Error Cases**
- 400: Email already in use
- 401: No token
- 403: Not authorized
- 404: User not found

---

### Change Password
**PUT** `/users/change-password/:id`

**Parameters**
- `id` - User ID

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass456",
  "confirmPassword": "NewPass456"
}
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Cases**
- 400: Passwords don't match or invalid new password
- 401: Current password is incorrect or no token
- 403: Not authorized
- 404: User not found

**Password Requirements**
- Minimum 6 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

---

### Activate User (Admin Only)
**PUT** `/users/activate/:id`

**Parameters**
- `id` - User ID to activate

**Headers**
```
Authorization: Bearer <token>
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "User activated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

**Error Cases**
- 401: No token
- 403: User is not admin
- 404: User not found

---

### Deactivate User (Admin Only)
**PUT** `/users/deactivate/:id`

**Parameters**
- `id` - User ID to deactivate

**Headers**
```
Authorization: Bearer <token>
```

**Response** (200 OK)
```json
{
  "success": true,
  "message": "User deactivated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "inactive"
  }
}
```

**Error Cases**
- 401: No token
- 403: User is not admin
- 404: User not found

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid data or validation error |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Access denied (role restriction) |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server error |

---

## User Roles

### User Role
- Can view own profile
- Can edit own profile
- Can change own password
- Cannot access admin endpoints

### Admin Role
- Can do everything a user can do
- Can view all users with pagination
- Can activate/deactivate user accounts
- Can access admin endpoints

---

## Example Requests Using cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Users (Admin)
```bash
curl -X GET "http://localhost:5000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Profile
```bash
curl -X PUT http://localhost:5000/api/users/profile/USER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "fullName": "Jane Doe",
    "email": "jane@example.com"
  }'
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider implementing rate limiting to prevent abuse.

## CORS

CORS is enabled for all origins in development. In production, restrict this to your frontend domain:

```javascript
cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
})
```
