# 📝 To-Do List App

A full-stack To-Do List application built with **React**, **Node.js (Express)**, and **Prisma**. Features include user authentication with **JWT**, draggable tasks using **drag-and-drop**, and secure connection to a database using environment variables.

---

## 🚀 Features

- ✅ User Authentication (Login & Register)
- 🔐 JWT-based Auth System
- 🗃️ Task Management with Projects
- 🧲 Drag and Drop Support (via `dnd-kit`)
- 🌐 Full REST API Backend
- 🛠️ PostgreSQL with Prisma ORM

---

## 🧱 Tech Stack

### Frontend
- React
- Axios
- React Router
- dnd-kit (for drag and drop)

### Backend
- Node.js with Express
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)

---

## ⚙️ Environment Variables

Create a `.env` file in the root of your **backend** project and add:

```env
DATABASE_URL=your_postgres_connection_string
SECRET_KEY=your_jwt_secret_key
```

## 📦 Installation
1. Clone the Repository
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```


2. Set Up Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
node app.js
```
3. Set Up Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🧪 API Overview
- POST /register – Create a new user
- POST /login – Authenticate and get JWT token
- GET /me – Get current user
- GET /projects – List user projects
- POST /projects – Create a project
- POST /tasks – Create a task
- PUT /tasks/:id – Update task (e.g. reorder)
- DELETE /tasks/:id – Delete a task

All protected routes require an Authorization: Bearer <token> header.

## 🧩 Drag and Drop
The app uses @dnd-kit to provide intuitive drag-and-drop for reordering tasks within a project.

## 🛡️ Authentication
JWT tokens are issued on login and must be attached to protected requests. Tokens are stored in localStorage on the frontend.

## 📷 Screenshots
![image](https://github.com/user-attachments/assets/8f795e3d-fa51-4d9d-88bf-c27a12cea63b)
![image](https://github.com/user-attachments/assets/84445199-968e-4801-ac4b-3507f3dda7dc)
![image](https://github.com/user-attachments/assets/d0cc0545-4a25-433d-a66d-694a173f941a)

