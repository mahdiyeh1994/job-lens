# JobLens

JobLens is a simple job application tracker built with Next.js. It helps you manage applications in a clean kanban-style board and move each opportunity through stages such as Applied, Interview, Offer, and Rejected.

## Project purpose

The app is designed for job seekers who want a quick way to:

- add new job applications
- edit application details
- delete applications when they are no longer relevant
- drag applications between workflow columns
- keep a simple overview of current application progress

## Main features

- Kanban board for application tracking
- Add and edit dialogs for application details
- Drag-and-drop status updates using dnd-kit
- Summary cards showing counts by status
- Prisma + Neon PostgreSQL data storage
- Server actions for saving and updating records

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- Neon PostgreSQL database
- Tailwind CSS
- shadcn-style UI components

## Project structure

- `app/` — application routes and server actions
- `components/` — UI components, dialogs, and kanban board
- `lib/` — shared types and database helpers
- `prisma/` — Prisma schema and database configuration

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Add your Neon connection string to `.env.local` as `DATABASE_URL`.

3. Generate Prisma client and prepare the Neon database:

```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:

```bash
npm run dev
```

5. Open the app in your browser at:

```text
http://localhost:3000
```

## Notes

This project is a lightweight personal dashboard for tracking applications. Records are stored in Neon PostgreSQL through Prisma, so the same data is available across development and deployed environments.
