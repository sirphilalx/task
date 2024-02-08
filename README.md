# TASK MANAGEMENT APP API AND SECURITY DEFINITION

This is a simple Task Management App built with Node.js, bcryptjs, jsonwebtoken, and Express.js. The application allows users to register, log in, and manage their tasks.

## Table of Contents

- Features
- Prerequisites
- Installation
- Usage
- Endpoints
- Authentication
- Contributing
- License

## Features

- User registration and authentication.
- Create, read, update, and delete tasks.
- Token-based authentication using JSON Web Tokens (JWT).
- Secure password hashing with bcryptjs.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB database (local or cloud-based)
- npm or yarn installed

## Installation

1.  Clone the repository

```bash
git clone https://github.com/your-username/task-management-app.git
```

2.  Navigate the project directory

```bash
cd cooperative-app
```

3.  Install dependencies

```bash
npm install
```

4. Set up your MongoDB connection by creating a .env file in the project root and adding your MongoDB URI:

```env
MONGODB_URI=your-mongodb-uri
```

## Usage

1. Start the application:

```bash
npm start
```

2. Access the app at http://localhost:3000 in your browser.

## Endpoints

- POST /api/users/register: Register a new user.
- POST /api/users/login: Log in an existing user.
- GET /api/tasks: Get all tasks for the authenticated user.
- GET /api/tasks/:id: Get a specific task by ID.
- POST /api/tasks: Create a new task.
- PUT /api/tasks/:id: Update a task by ID.
- DELETE /api/tasks/:id: Delete a task by ID.

## Authentication

- The app uses JWT (JSON Web Tokens) for user authentication.

- Include the JWT token in the Authorization header for protected routes.

Example:

```http
GET /api/tasks
Authorization: Bearer your-token-here
```

## Contribution

Contributions are welcome!

## License

This project is licensed under the MIT License.

## Author

- Philemon Okpokpa
- remotephil.upwork@gmail.com
- LinkedIn: https://www.linkedin.com/philemon-okpokpa/
