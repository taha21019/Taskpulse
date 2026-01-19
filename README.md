# TaskPulse

TaskPulse is a simple full-stack task management application built with
**Angular** (frontend) and **Quarkus** (Java backend).

## Features
- Kanban board with three states: **To Do**, **In Progress**, **Done**
- Create tasks with title and description
- Move tasks between states
- RESTful backend API
- Clean layered architecture (model / service / resource)

## Tech Stack
- Frontend: Angular, TypeScript
- Backend: Java, Quarkus (JAX-RS)
- API: REST (JSON)
- Tools: GitHub, VS Code

## Project Structure
## How it works
The Angular frontend communicates with the Quarkus backend via REST APIs.
The backend stores tasks in memory and exposes endpoints to create, list,
and update task status.

## Future Improvements
- Persist data using a database (PostgreSQL)
- Authentication and user accounts
- Dockerized deployment
- Drag-and-drop UI

---
