# QueryMate – Chat With DB

QueryMate is a full-stack SaaS application that allows users to query their databases using natural language. It converts user questions into code using AI, executes queries safely, and displays results with visualization.

This project is built with separate frontend and backend architecture to simulate real-world production systems.

---

## Features

* AI-powered query generation
* Connect PostgreSQL, MySQL, SQLLite, MONGODB databases
* Secure authentication (JWT)
* Execute queries with safety validation
* Query history and saved queries
* Results table with export (CSV, JSON)
* Modern dashboard UI

---

## Tech Stack

**Frontend**

* Next.js
* TypeScript
* Tailwind CSS

**Backend**

* Next.js API
* PostgreSQL
* Redis
* JWT Authentication

**AI**

* OpenAI API

---


## How It Works

1. User connects their database
2. User asks question in natural language
3. Backend sends request to OpenAI
4. AI generates SQL query
5. Backend validates and executes query
6. Results displayed in frontend


## QueryMate Build Timeline

### 19 Feb 2026 — Logger Setup

Status: Completed ✅  
Branch: `dev`  
Features:

- Turborepo configured
- Pino Logger setup
- Logger transport create
- Package workspace add

### 20 Feb 2026 — Backend Foundation

Status: Completed ✅  
Branch: `feature/backend-api`  
Features:

- Express backend initialized
- Logger added [instant of console.log]
- Env setup and type-safe

### 21 Feb 2026 — Drizzle Setup

Status: Completed ✅  
Branch: `feature/backend-api`  
Features:

- drizzle setup
- auth schema create for signup/login
- session schema create for different manageable session
- fix ts/js file import extension typescript classic error

### 22 Feb 2026 — Error & Signup Route

Status: Completed ✅  
Branch: `feature/backend-api`  
Features:
- api error & error middleware setup
- password hash fn. create
- jwt token generate fn. with package josh
- create signup `POST` route with token and password hash

## Author

Dhiraj Arya