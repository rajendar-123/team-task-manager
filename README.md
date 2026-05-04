# Team Task Manager

A production-ready full-stack web application with Admin and Member role-based access.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas + Mongoose
- Authentication: JWT + bcrypt
- Deployment: Railway

## Folder Structure

```txt
team-task-manager/
├── backend/
└── frontend/
```

## Local Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `GET /api/users` - Admin only

### Projects

- `POST /api/projects` - Admin only
- `GET /api/projects`
- `GET /api/projects/:id`

### Tasks

- `POST /api/tasks` - Admin only
- `GET /api/tasks`
- `GET /api/tasks?status=todo`
- `PATCH /api/tasks/:id/status`
- `DELETE /api/tasks/:id` - Admin only

## Railway Deployment

Deploy backend and frontend as two separate Railway services.

### Backend Railway Variables

```env
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_long_secret
CLIENT_URL=https://your-frontend-url.up.railway.app
```

### Frontend Railway Variables

```env
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

## Important MongoDB Password Fix

If your MongoDB password is `Mani@964`, use this encoded version in the URI:

```txt
Mani%40964
```

Example:

```env
MONGO_URI=mongodb+srv://username:Mani%40964@cluster0.xxxxx.mongodb.net/team-task-manager?retryWrites=true&w=majority
```

Also allow Network Access in MongoDB Atlas:

```txt
0.0.0.0/0
```

## Default Usage

1. Signup as Admin.
2. Signup members.
3. Admin creates projects.
4. Admin assigns tasks.
5. Members login and update task status.
