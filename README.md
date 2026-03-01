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

### 26 Feb 2026 — Next.js Switch

Status: Completed ✅  
Branch: `dev and main`  
Features:
- remove monorepo for faster mvp
- next.js & drizzle setup
- user schema and types created
- landing page create & deploy on `https://querymate.dhirajarya.xyz`

### 27 Feb 2026 — Better Auth config

Status: Completed ✅  
Branch: `dev`  
Features:
- better auth configure
- drizzle orm connect schema generate
- auth and authClient create
- api routes for better auth

### 28 Feb 2026 — Protected Routes & layout

Status: Completed ✅  
Branch: `dev`  
Features:
- better auth signup /signup
- zod and react-form-hook setup
- protected routes setup
- sidebar layout setup
- stich app design create

### 1 Mar 2026 — DB Connection 

Status: Completed ✅  
Branch: `dev`  
Features:
- connection page ui create
- model create connection form
- test connection func.
- save connection on DB.

## Author

Dhiraj Arya