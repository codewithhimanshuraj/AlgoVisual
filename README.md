# AlgoVisual - Production Ready DSA Visualizer

AlgoVisual is a comprehensive, production-ready Data Structures and Algorithms visualizer built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- **Sorting Visualizer**: Bubble Sort, Selection Sort with animations, speed control, and array size adjustment.
- **Searching Visualizer**: Linear Search, Binary Search with visual indicators.
- **Graph Visualizer**: Interactive node/edge creation, BFS, and DFS visualizations.
- **Pathfinding Visualizer**: Grid-based interactive wall building, and BFS shortest path algorithm.
- **Code Playground**: Integrated Monaco Editor supporting JavaScript, Python, C++, and Java execution simulation.
- **Authentication**: JWT-based login and registration.
- **Dark/Light Mode**: Full theme support with Tailwind CSS.

## Technology Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Monaco Editor
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT

## Folder Structure
```
visualizer/
├── client/          # Frontend React/Vite app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth and Theme context
│   │   ├── pages/       # Visualizer pages and views
│   │   ├── utils/       # Algorithm logic
│   │   ├── App.jsx      # Routing
│   │   └── main.jsx     # Entry point
│   ├── tailwind.config.js
│   └── package.json
└── server/          # Backend Express app
    ├── config/      # Database connection
    ├── controllers/ # Route logic
    ├── middleware/  # JWT Protection
    ├── models/      # Mongoose Schemas
    ├── routes/      # API Endpoints
    ├── index.js     # Server entry point
    └── .env.example
```

## Running Locally

1. **Clone the repository** (if applicable).
2. **Backend Setup**:
   ```bash
   cd server
   npm install
   cp .env.example .env 
   # Edit .env and add your MONGO_URI and JWT_SECRET
   npm run dev
   ```
3. **Frontend Setup**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Deployment Guide

### Database (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Get the connection string (`mongodb+srv://...`).
3. Add it to your backend environment variables as `MONGO_URI`.

### Backend (Render / Heroku)
1. Connect your GitHub repository to Render (Web Service).
2. Set the Root Directory to `server`.
3. Build Command: `npm install`
4. Start Command: `node index.js`
5. Add Environment Variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.

### Frontend (Vercel / Netlify)
1. Connect your GitHub repository to Vercel.
2. Set the Root Directory to `client`.
3. Vercel will auto-detect Vite. Build command is `npm run build`.
4. Output directory is `dist`.
5. Add Environment Variable: If you have an API URL, add `VITE_API_URL` pointing to your deployed Render backend. (Update frontend axios calls to use this env var).

## API Documentation

### Auth Routes
- `POST /api/auth/register`
  - Body: `{ name, email, password }`
  - Returns: `{ _id, name, email, token }`
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Returns: `{ _id, name, email, token }`
- `GET /api/auth/profile`
  - Headers: `Authorization: Bearer <token>`
  - Returns: User Object
