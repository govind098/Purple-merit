# Deployment Guide - Purple Merit Full Stack

## Overview
- **Backend**: Render.com (Node.js/Express)
- **Frontend**: Vercel (React)
- **Database**: MongoDB Atlas (Cloud)

---

## Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up (free tier available)
3. Create a new project called "Purple Merit"

### 1.2 Create a Cluster
1. Click "Create Deployment"
2. Select **M0 Free Tier**
3. Choose your region (closest to you)
4. Click "Create Deployment"

### 1.3 Create Database User
1. Go to **Database Access** → **Add New Database User**
2. Create username: `purplemerit` (or any username)
3. Auto-generate password or create a strong one
4. Copy the password (you'll need it)

### 1.4 Get Connection String
1. Go to **Databases** → Click your cluster → **Connect**
2. Choose **Drivers** → **Node.js**
3. Copy the connection string
4. Replace `<username>:<password>` with your actual credentials
5. Replace `myFirstDatabase` with `purplemerit`

**Example format:**
```
mongodb+srv://purplemerit:yourpassword@cluster0.abc123.mongodb.net/purplemerit?retryWrites=true&w=majority
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Connect your GitHub account

### 2.2 Push Your Code to GitHub
```bash
cd c:\Users\02kum\OneDrive\Desktop\Purple\ Merit\full_Stack_project
git init
git add .
git commit -m "Initial commit - Purple Merit app"
git remote add origin https://github.com/YOUR_USERNAME/purple-merit.git
git push -u origin main
```

### 2.3 Deploy Backend on Render
1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: `purple-merit-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Runtime**: Node
   - **Plan**: Free

5. Click **Create Web Service**

### 2.4 Add Environment Variables
1. Once created, go to your service **Settings** → **Environment**
2. Add the following variables:
   ```
   MONGODB_URI=mongodb+srv://purplemerit:password@cluster.mongodb.net/purplemerit?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-key-minimum-32-characters-long
   NODE_ENV=production
   PORT=5000
   ```
3. Click **Save Changes**
4. The service will redeploy automatically

### 2.5 Note Your Backend URL
Once deployed, you'll get a URL like:
```
https://purple-merit-backend.onrender.com
```
Copy this URL - you'll need it for the frontend.

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect your GitHub account

### 3.2 Deploy Frontend
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your GitHub repository
3. Fill in the details:
   - **Project Name**: `purple-merit-frontend`
   - **Framework**: Vite
   - **Root Directory**: `frontend`

4. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://purple-merit-backend.onrender.com/api`
   - Click **Add**

5. Click **Deploy**

### 3.3 Wait for Deployment
- Vercel will build and deploy automatically
- You'll get a URL like: `https://purple-merit-frontend.vercel.app`
- Once complete, your app is live!

---

## Step 4: Testing the Deployed App

1. Open your Vercel frontend URL
2. Test the authentication flow:
   - Sign up as a **User**
   - Sign up as an **Admin**
   - Login and verify access
3. Test user profile functionality
4. Test admin dashboard (if admin)

---

## Common Issues & Fixes

### Issue: Backend returns 404
- Check `VITE_API_URL` in Vercel environment variables
- Make sure it includes `/api` at the end

### Issue: CORS errors
- Backend already has CORS enabled globally
- If still issues, Render domain might be in use

### Issue: Database connection fails
- Verify MongoDB connection string in `MONGODB_URI`
- Check if IP is whitelisted (MongoDB Atlas → Network Access → Allow All)

### Issue: Vercel shows build errors
- Make sure `npm run build` works locally first
- Check that all dependencies are in `package.json`

---

## Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<random-32-character-string>
NODE_ENV=production
PORT=5000
```

### Frontend (Vercel)
```
VITE_API_URL=https://purple-merit-backend.onrender.com/api
```

---

## Next Steps (Optional)

### Custom Domain
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel: **Settings** → **Domains**
3. In Render: **Settings** → **Custom Domain**

### Monitoring
- **Render**: View logs in **Dashboard** → **Logs**
- **Vercel**: View logs in **Deployments** → **View Deployment**

### Update Code
1. Push changes to GitHub
2. Both Render and Vercel auto-redeploy on push

---

## Success! 🎉
Your app is now live and accessible worldwide!
