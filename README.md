# URL Shortener

A submission for DCUBE's TAP assessment 2023, created by [Remus Kwan](https://www.remuskwan.dev/).

## Features

- Shortening of long URLs into shorter, friendlier URLs.
- Short URLs can be shared, and redirect to original URL when short URL is accessed.
- User-managed URLs for creating, viewing and deleting their own URLs.
- Password authentication with encryption during user sign-in.
- User sessions stored as cookies.

## Demo

Access the live demo at https://url-shortener-remus.vercel.app/

## Technical Considerations

### Tech Stack

- React.js as a versatile front-end frameworks for building web interfaces
- Next.js as a React framework for building full-stack applications with robust backend and web services
- tRPC for building type-safe web applications with TypeScript
- CockroachDB as a cloud-enabled relational database for persisting data across system reboots
- Vercel as a CI/CD tool for deploying the application end-to-end
- OGP's [Starter Kit](https://start.open.gov.sg/) as a kickstart for the project.

### Performance

### Encoding Collisions

## Future Improvements

Due to time constraints, certain functionalities have yet to be implemented:

- Password validation to ensure accounts are created with strong passwords.
- Search/filter functionality for user-created URLs.
- Implement soft delete for user and URLs
- Standalone Key Generation Store that generates random strings beforehand and stores them in a database
- Distinct look and feel to the application.

## Running the app locally

### Install dependencies

```bash
npm i
```

### Set environment variables

```bash
cp .env.example .env
```

#### Retrieving client-side environment variables in code

⚠️ When adding client-only environment variables in NextJS, you must prefix the variable with `NEXT_PUBLIC_` to ensure that the variable is exposed to the browser. For example, if you want to add a variable called `MY_ENV_VAR`, you should add it to your `.env` file as `NEXT_PUBLIC_MY_ENV_VAR`.

You will also need to update [src/env.mjs](src/env.mjs#L17) to explicitly reference the variable so NextJS will correctly bundle the environment variable into the client-side bundle.

### Start database

```bash
# Assumes that you have previously copied .env.example to .env.development.local
npm run setup
```

### Start server

```bash
npm run dev
```

# Useful notes

## Commands

```bash
npm run build      # runs `prisma generate` + `prisma migrate` + `next build`
npm run db:reset   # resets local db
npm run dev        # starts next.js
npm run setup      # starts cockroach db + runs migrations + seed
npm run test-dev   # runs e2e tests on dev
npm run test-start # runs e2e tests on `next start` - build required before
npm run test:unit  # runs normal Vitest unit tests
npm run test:e2e   # runs e2e tests
```

---
