# HireFlow - Mini Recruitment Workflow System

## Project Overview

HireFlow is a full-stack recruitment workflow system developed as a technical assignment.
The application allows administrators to manage candidates throughout the hiring process. It provides authentication, candidate management, assignment tracking, recruitment workflow management, and a dashboard with recruitment statistics.
This project was built using the MERN ecosystem (Next.js frontend with Express.js backend), PostgreSQL database, Prisma ORM, JWT authentication, and Tailwind CSS.
## Features

### Authentication
- User Signup
- User Login
- JWT-based Authentication
- Protected Routes

### Candidate Management
- Add New Candidate
- View All Candidates
- Update Candidate Information
- Delete Candidate
- Recruitment Status Management
  - Applied
  - Interviewing
  - Selected
  - Rejected
- Candidate Notes

### Assignment Tracking
- Create Assignment
- Assign Candidate
- Assignment Status
  - Pending
  - Submitted
  - Completed
- Due Date Management

### Dashboard
- Total Candidates
- Interviewing Candidates
- Selected Candidates
- Recent Applications

### Responsive Design
- Mobile Friendly
- Tablet Friendly
- Desktop Friendly

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT (JSON Web Token)
- bcrypt

### Tools
- Git
- GitHub
- Postman
- VS Code
---

## Folder Structure

```text
hireflow/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   ├── config/
│   ├── index.ts
│   └── package.json
│
├── src/
│   └── app/
│       ├── components/
│       ├── login/
│       ├── signup/
│       ├── candidates/
│       ├── add-candidate/
│       ├── assignments/
│       ├── add-assignment/
│       └── page.tsx
│
├── README.md
└── package.json
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Install Frontend Dependencies

```bash
pnpm install
```

### Install Backend Dependencies

```bash
cd backend
pnpm install
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder and add the following variables:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Run the Project

### Start Backend

```bash
cd backend
pnpm dev
```

### Start Frontend

```bash
pnpm dev
```
---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register a new user |
| POST | /api/auth/login | Login user |

### Candidates

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/candidates | Get all candidates |
| GET | /api/candidates/:id | Get single candidate |
| POST | /api/candidates | Create candidate |
| PUT | /api/candidates/:id | Update candidate |
| DELETE | /api/candidates/:id | Delete candidate |

### Assignments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/assignments | Get all assignments |
| GET | /api/assignments/:id | Get single assignment |
| POST | /api/assignments | Create assignment |
| PUT | /api/assignments/:id | Update assignment |
| DELETE | /api/assignments/:id | Delete assignment |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/dashboard | Dashboard statistics |

---

## Future Improvements

- Role-based authentication
- Email notifications
- Resume upload support
- Search and advanced filtering
- Pagination
- Dark mode
- Interview scheduling
- Candidate profile image upload

---

## Author

**Eman Sajjad**

Full-Stack Developer (MERN Stack)

---

## License

This project was developed as part of a technical assessment and is intended for educational and demonstration purposes.