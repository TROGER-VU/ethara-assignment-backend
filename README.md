# Team Task Manager API

A full-stack backend system for managing projects, tasks, and teams with **role-based access control (RBAC)**, built using Node.js, Express, and PostgreSQL.

---

## Overview

This application allows users to:

* Create and manage projects
* Add team members
* Create, assign, and track tasks
* Enforce role-based permissions (Admin / Member)
* View analytics via dashboard APIs

The system is designed with **real-world backend architecture practices**, including authentication, authorization, relational data modeling, and API documentation.

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Railway)
* **Authentication:** JWT (jsonwebtoken)
* **Password Hashing:** bcrypt
* **API Docs:** Swagger (swagger-jsdoc, swagger-ui-express)
* **Deployment:** Railway

---

## Authentication & Authorization

### Authentication

* JWT-based authentication
* Token required for all protected routes

### Role-Based Access Control (RBAC)

Roles are **project-specific**, stored in `project_members`.

| Action             | Admin | Member             |
| ------------------ | ----- | ------------------ |
| Create Project     | ✅     | ❌                  |
| Add Members        | ✅     | ❌                  |
| Create Task        | ✅     | ✅                  |
| Assign Task        | ✅     | ❌                  |
| Update Task Status | ❌     | ✅ (own tasks only) |
| View Project Tasks | ✅     | ✅                  |

---

## Database Schema

### Users

* id (UUID)
* name
* email
* password
* created_at

### Projects

* id
* name
* description
* created_by
* created_at

### Project Members

* id
* user_id
* project_id
* role (admin / member)

### Tasks

* id
* title
* description
* status (todo / in-progress / done)
* priority (low / medium / high)
* due_date
* project_id
* assigned_to
* created_by
* created_at

---

## API Endpoints

### Auth

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | /auth/signup | Register user     |
| POST   | /auth/login  | Login and get JWT |

---

### Projects

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | /projects            | Create project          |
| POST   | /projects/add-member | Add member (Admin only) |

---

### Tasks

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| POST   | /tasks            | Create task              |
| POST   | /tasks/assign     | Assign task (Admin only) |
| PATCH  | /tasks/status     | Update task status       |
| GET    | /tasks/:projectId | Get project tasks        |

---

### Dashboard

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | /tasks/my-tasks         | Tasks assigned to user |
| GET    | /tasks/overdue          | Overdue tasks          |
| GET    | /tasks/stats/:projectId | Project analytics      |

---

## Example Request

### Create Task

```json
{
  "title": "Fix login bug",
  "description": "Resolve authentication issue",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-05-10T10:00:00Z",
  "projectId": "uuid",
  "assignedTo": "uuid"
}
```

---

## API Documentation (Swagger)

Swagger UI available at:

```
/api-docs
```

Features:

* Interactive API testing
* JWT authorization support
* Request/response schemas

---

## Deployment

* Backend hosted on Railway
* PostgreSQL database via Railway

To run locally:

```bash
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file:

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
BASE_URL=http://localhost:5000
```

---

## Features Implemented

* JWT Authentication
* Project-based RBAC
* Task lifecycle management
* Dashboard analytics (stats, overdue tasks)
* Swagger API documentation
* Railway deployment

---

## Key Highlights (Interview Points)

* Designed **many-to-many relationship** using `project_members`
* Implemented **project-level RBAC**, not global roles
* Secured APIs using **JWT middleware**
* Built **dashboard analytics using SQL aggregations**
* Followed **modular backend architecture (controllers, routes, middleware)**

---

## 👨‍💻 Author

Ayush Gupta