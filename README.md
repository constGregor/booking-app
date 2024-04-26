This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Database Creation:

    Ensure PostgreSQL is installed and running.
    Create a new database named "reservation-app" using your PostgreSQL client or command line.

Install Dependencies:

    Run npm install in the project directory to install all required dependencies.

Database Migration:

    Run npm run migrate-to-latest to apply database migrations

## Funcional requirments of a project:

Page with date/time selection

Basic information input: name, email, phone

Thank you page

The application should allow only one reservation for a specific time/date.

The frontend should not display already booked time slots, or indicate them clearly as booked.

Upon creating the first request, a record about the user with the main identification element being email should be created on the backend.

All further requests with the same email address should be assigned to the same user.
