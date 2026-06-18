# AlgoVisual - Production Ready DSA Visualizer

AlgoVisual is a comprehensive, production-ready Data Structures and Algorithms visualizer built with the MERN stack (MongoDB, Express, React, Node.js).

---

## Features

- **Sorting Visualizer**: Bubble Sort, Selection Sort with animations, speed control, and array size adjustment.
- **Searching Visualizer**: Linear Search, Binary Search with visual indicators.
- **Graph Visualizer**: Interactive node/edge creation, BFS, and DFS visualizations.
- **Pathfinding Visualizer**: Grid-based interactive wall building and BFS shortest path algorithm.
- **Code Playground**: Integrated Monaco Editor supporting JavaScript, Python, C++, and Java execution simulation.
- **Authentication**: JWT-based login and registration.
- **Dark/Light Mode**: Full theme support with Tailwind CSS.

## Technology Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Monaco Editor

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Folder Structure

```bash
visualizer/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── index.js
    └── .env.example
```

---

## Running Locally

### Clone Repository

```bash
git clone https://github.com/codewithhimanshuraj/AlgoVisual.git
cd AlgoVisual
```

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Add your environment variables:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Deployment Guide

### MongoDB Atlas

1. Create a free cluster on MongoDB Atlas
2. Get your MongoDB connection string
3. Add it to your backend `.env`

---

### Backend Deployment (Render)

- Root Directory: `server`
- Build Command:

```bash
npm install
```

- Start Command:

```bash
node index.js
```

Environment Variables:
- `MONGO_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

Settings used:
- Root Directory → `client`
- Build Command → `npm run build`
- Output Directory → `dist`

---

## API Documentation

### POST `/api/auth/register`

Request:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "_id": "user_id",
  "name": "John",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

---

### POST `/api/auth/login`

Request:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

### GET `/api/auth/profile`

Headers:

```bash
Authorization: Bearer <token>
```

Returns authenticated user data.

---

## Author

### Himanshu Raj

GitHub: https://github.com/codewithhimanshuraj

---

## License

This project is licensed under the MIT License.
