# Team Task Manager API

## 🚀 Features
- User Authentication (JWT)
- Project Management
- Task Assignment & Tracking
- Role-Based Access Control (RBAC)
- Dashboard APIs (stats, overdue tasks)

## 🛠 Tech Stack
- Node.js + Express
- PostgreSQL
- Railway (deployment)

## 🔐 Roles
- Admin: manage members, assign tasks
- Member: create/update tasks

## 📌 API Endpoints

### Auth
POST /auth/signup  
POST /auth/login  

### Projects
POST /projects  
POST /projects/add-member  

### Tasks
POST /tasks  
POST /tasks/assign  
PATCH /tasks/status  
GET /tasks/:projectId  

### Dashboard
GET /tasks/my-tasks  
GET /tasks/overdue  
GET /tasks/stats/:projectId  

## 🌐 Deployment
Backend hosted on Railway