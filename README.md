# QueryMate – Chat With DB

QueryMate is a full-stack SaaS application that allows users to query their databases using natural language. It converts user questions into code using AI, executes queries safely, and displays results with visualization.

This project is built with separate frontend and backend architecture to simulate real-world production systems.

---
## Demo
[![Watch the video](https://img.youtube.com/vi/z9KL74Jio_s/0.jpg)](https://www.youtube.com/watch?v=z9KL74Jio_s)

> [!WARNING]
> Preview version only support Postgres and MySQL db tested.

## Features

* AI-powered query generation
* Connect PostgreSQL, MySQL, SQLLite, MONGODB databases
* Secure authentication (JWT and google)
* Execute queries with safety validation
* Query history and saved queries 
* Results table with export (CSV, JSON) [upcoming]
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
* JWT Authentication

**AI**

* Groq API

---


## How It Works

1. User connects their database
2. User asks question in natural language
3. Backend sends request to Groq api
4. AI generates SQL query
5. Backend validates and executes query
6. Results displayed in frontend

## Author

Dhiraj Arya [dhirajarya.ptn@gmail.com]