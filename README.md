# 🧠 Task Manager App

A fullstack Task Manager application built as a portfolio project.  
It allows users to manage their tasks with authentication, filtering, and real-time UI feedback.

---

## 🚀 Features

### 🔐 Authentication
- Register & Login with JWT
- Password hashing with bcrypt
- Protected routes (frontend & backend)

### ✅ Task Management (CRUD)
- Create tasks
- Edit title and description
- Mark tasks as completed / not completed
- Delete tasks
- Each user only sees their own tasks

### 🔍 UX & UI
- Client-side task filtering (search by title)
- Pagination
- Loading states (spinners)
- Empty states
- Confirmation modals for destructive actions
- Clean UI inspired by modern SaaS apps (Linear / Notion)

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Material UI
- Context API (state management)

### Backend
- Node.js
- Express
- MySQL
- JWT (authentication)
- bcrypt (password hashing)

---

## 🗄️ Database

### Users
- `id`
- `email`
- `name`
- `password_hash`
- timestamps

### Tasks
- `id`
- `user_id`
- `title`
- `description`
- `completed_at`
- `start_date`
- `due_date`
- `priority` (low / medium / high)
- timestamps

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend root:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_manager
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
npm run dev
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧠 Future Improvements

- Server-side filtering & sorting
- Task categories / tags
- Drag & drop (kanban style)
- Notifications system
- Dark mode

---

## 👨‍💻 Author

**Isaac**  
Frontend Developer (React, JavaScript)
