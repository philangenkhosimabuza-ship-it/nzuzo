# Nzuza Attorneys Backend Documentation

This project uses a **Node.js**, **Express**, and **MongoDB** backend to power the dynamic features of the website.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or MongoDB Atlas URI)

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the root directory (already created) with the following variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/nzuza_attorneys
    JWT_SECRET=your_secret_key_here
    NODE_ENV=development
    ```

3.  **Run the Server**
    - Development mode (with nodemon):
      ```bash
      npm run dev
      ```
    - Production mode:
      ```bash
      npm start
      ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user (Admin/Attorney)
- `POST /api/auth/register` - Register new user (Public for setup, should be secured)

### Jobs (Careers)
- `GET /api/jobs` - Get all open jobs
- `GET /api/jobs/:id` - Get specific job details
- `POST /api/jobs` - Create a new job (Admin only)
- `POST /api/jobs/apply` - Apply for a job (Upload CV)

### Messages (WhatsApp/Contact)
- `POST /api/messages` - Log a new message/inquiry
- `GET /api/messages` - Get all messages (Admin only)

## Folder Structure

- `backend/` - Backend source code
  - `config/` - Database configuration
  - `controllers/` - Route logic
  - `middleware/` - Auth and error handling middleware
  - `models/` - Mongoose data models
  - `routes/` - API route definitions
  - `uploads/` - Stored CVs and documents
- `server.js` - Main entry point

## Frontend Integration

The frontend (`index.html`, etc.) is served statically by the Express server.
- The **Careers** page (`careers.html`) submits applications to `/api/jobs/apply`.
- The **Contact** form (in `main.js`) should be updated to post to `/api/messages` if logging is desired before WhatsApp redirection.

## Admin Dashboard

To manage jobs and view applications, you can use a tool like **Postman** to interact with the API or build a separate Admin React App / HTML dashboard that consumes these APIs using the JWT token from login.
