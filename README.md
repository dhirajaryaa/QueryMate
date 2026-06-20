# QueryMate

QueryMate is an AI-powered database assistant that lets you chat with your databases using natural language.

## Demo
[![Watch the video](https://img.youtube.com/vi/z9KL74Jio_s/0.jpg)](https://www.youtube.com/watch?v=z9KL74Jio_s)

> [!WARNING]
> Fully Tested Postgres and MySQL db Only.

## Features

* Connect PostgreSQL and MySQL databases
* Ask questions in plain English
* AI-generated SQL queries
* Secure read-only query execution
* Database schema understanding
* Chat history management
* Multiple database connections
* Modern and responsive UI

## Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js API Routes & Server Action
* Drizzle ORM
* PostgreSQL
* Better Auth

### AI

* Vercel AI Sdk 5
* Groq AI provider API

## Getting Started

```bash
git clone https://github.com/dhirajaryaa/querymate.git
cd querymate

pnpm install

cp .env.example .env

pnpm db:push

pnpm dev
```

Open http://localhost:3000

## Environment Variables

```env
DATABASE_URL=""

BETTER_AUTH_SECRET=''
BETTER_AUTH_URL='http://localhost:3000'

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

PUBLIC_URL='http://localhost:3000'

LOG_LEVEL='info'

LLM_API_KEY=''

# telgrame bot [for bug & feature ] report 
TELEGRAM_BOT_TOKEN=''
TELEGRAM_CHAT_ID=''
```

## Roadmap

* [x] Authentication
* [x] Database Connections
* [x] AI SQL Generation
* [x] Query Execution
* [x] Chat Interface
* [x] Persistent Chats

## License

MIT
