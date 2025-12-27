# Task Manager API

A RESTful API for managing tasks with CRUD operations, filtering, sorting, and priority levels.

## Overview

This is a Node.js/Express-based task management API that allows you to create, read, update, and delete tasks. Tasks are stored in-memory and include features like completion status tracking, priority levels, and filtering capabilities.

## Features

- Create, read, update, and delete tasks
- Filter tasks by completion status
- Sort tasks by creation date
- Priority levels (low, medium, high)
- Input validation and error handling
- RESTful API design

## Task Schema

```json
{
  "id": 1,
  "title": "Create a new project",
  "description": "Create a new project using Magic",
  "completed": false,
  "priority": "medium",
  "createdAt": "2025-12-28T10:30:00.000Z"
}
```

## Setup Instructions

### Prerequisites

- Node.js >= 18.0.0
- npm

### Installation

1. Clone the repository or download the project files

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node app.js
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Get All Tasks

**Endpoint:** `GET /tasks`

**Description:** Retrieve all tasks with optional filtering and sorting

**Query Parameters:**
- `completed` (optional): Filter by completion status (`true` or `false`)
- `sort` (optional): Sort by creation date (use `createdAt`)

**Examples:**
```bash
# Get all tasks
curl http://localhost:3000/tasks

# Get only completed tasks
curl http://localhost:3000/tasks?completed=true

# Get incomplete tasks
curl http://localhost:3000/tasks?completed=false

# Get all tasks sorted by creation date
curl http://localhost:3000/tasks?sort=createdAt
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Create a new project",
    "description": "Create a new project using Magic",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-12-28T10:30:00.000Z"
  }
]
```

---

### 2. Get Task by ID

**Endpoint:** `GET /tasks/:id`

**Description:** Retrieve a specific task by its ID

**Example:**
```bash
curl http://localhost:3000/tasks/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Create a new project",
  "description": "Create a new project using Magic",
  "completed": false,
  "priority": "high",
  "createdAt": "2025-12-28T10:30:00.000Z"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

---

### 3. Create a New Task

**Endpoint:** `POST /tasks`

**Description:** Create a new task

**Required Fields:**
- `title` (string): Non-empty task title
- `description` (string): Non-empty task description
- `completed` (boolean): Task completion status

**Optional Fields:**
- `priority` (string): Priority level - `low`, `medium`, or `high` (default: `medium`)

**Example:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Create a new project",
    "description": "Create a new project using Magic",
    "completed": false,
    "priority": "high"
  }'
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "Create a new project",
  "description": "Create a new project using Magic",
  "completed": false,
  "priority": "high",
  "createdAt": "2025-12-28T10:30:00.000Z"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "Missing required fields: title, description, completed"
}
```

---

### 4. Update a Task

**Endpoint:** `PUT /tasks/:id`

**Description:** Update an existing task by its ID

**Optional Fields:**
- `title` (string): Non-empty task title
- `description` (string): Non-empty task description
- `completed` (boolean): Task completion status
- `priority` (string): Priority level - `low`, `medium`, or `high`

**Example:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "priority": "low"
  }'
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Create a new project",
  "description": "Create a new project using Magic",
  "completed": true,
  "priority": "low",
  "createdAt": "2025-12-28T10:30:00.000Z"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

---

### 5. Delete a Task

**Endpoint:** `DELETE /tasks/:id`

**Description:** Delete a task by its ID

**Example:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Response:** `204 No Content`

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

---

### 6. Get Tasks by Priority

**Endpoint:** `GET /tasks/priority/:level`

**Description:** Retrieve all tasks with a specific priority level

**Parameters:**
- `level`: Priority level - `low`, `medium`, or `high`

**Examples:**
```bash
# Get all high priority tasks
curl http://localhost:3000/tasks/priority/high

# Get all medium priority tasks
curl http://localhost:3000/tasks/priority/medium

# Get all low priority tasks
curl http://localhost:3000/tasks/priority/low
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Create a new project",
    "description": "Create a new project using Magic",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-12-28T10:30:00.000Z"
  }
]
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "Priority level must be one of: low, medium, high"
}
```

---

## Testing the API

### Using curl

All examples above use curl commands. Make sure the server is running before testing.

### Using Postman

1. Import the following endpoints into Postman:
   - GET `http://localhost:3000/tasks`
   - GET `http://localhost:3000/tasks/:id`
   - GET `http://localhost:3000/tasks/priority/:level`
   - POST `http://localhost:3000/tasks`
   - PUT `http://localhost:3000/tasks/:id`
   - DELETE `http://localhost:3000/tasks/:id`

2. For POST and PUT requests, set the header:
   - Key: `Content-Type`
   - Value: `application/json`

3. Add the request body in the "Body" tab (select "raw" and "JSON")

### Test Scenarios

**Create multiple tasks:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Task 1","description":"First task","completed":false,"priority":"high"}'

curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Task 2","description":"Second task","completed":true,"priority":"medium"}'

curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Task 3","description":"Third task","completed":false,"priority":"low"}'
```

**Filter completed tasks:**
```bash
curl http://localhost:3000/tasks?completed=true
```

**Get high priority tasks:**
```bash
curl http://localhost:3000/tasks/priority/high
```

**Update a task:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Validation Rules

- **Title**: Must be a non-empty string (whitespace is trimmed)
- **Description**: Must be a non-empty string (whitespace is trimmed)
- **Completed**: Must be a boolean value (`true` or `false`)
- **Priority**: Must be one of: `low`, `medium`, or `high`
- **Task ID**: Must be a valid number

## Error Codes

- `200 OK`: Successful GET or PUT request
- `201 Created`: Successful POST request
- `204 No Content`: Successful DELETE request
- `400 Bad Request`: Invalid input or validation error
- `404 Not Found`: Task not found

## Project Structure

```
task-manager/
├── app.js                      # Main application file
├── controllers/
│   └── taskController.js       # Task business logic
├── routes/
│   └── taskRoutes.js          # Task route definitions
├── package.json               # Project dependencies
└── README.md                  # This file
```

## Technologies Used

- Node.js
- Express.js
- In-memory storage (no database required)

## Notes

- Tasks are stored in-memory, so all data will be lost when the server restarts
- The `createdAt` timestamp is automatically added when creating a task
- Task IDs are auto-incremented starting from 1
- Priority defaults to `medium` if not specified during task creation

## License

ISC
