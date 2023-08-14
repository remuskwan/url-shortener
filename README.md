# URL Shortener

A submission for DCUBE's TAP assessment 2023, created by [Remus Kwan](https://www.remuskwan.dev/).

## Features

- Shortening of long URLs into shorter, friendlier URLs.
- Short URLs can be shared, and redirect to original URL when short URL is accessed.
- User-managed URLs for creating, viewing and deleting their own URLs.
- Password authentication with encryption during user sign-in.
- User sessions stored as cookies.

## Demo

Access the live demo at https://short-re.vercel.app

## Technical Considerations

### Tech Stack

- React.js as a versatile front-end frameworks for building web interfaces
- Next.js as a React framework for building full-stack applications with robust backend and web services
- tRPC for building type-safe web applications with TypeScript
- Prisma as a Node.js and TypeScript ORM.
- CockroachDB as a cloud-enabled relational database for persisting data across system reboots
- Vercel as a CI/CD tool for deploying the application end-to-end
- OGP's [Starter Kit](https://start.open.gov.sg/) as a kickstart for the project.

### Architecture
The database contains two tables, User and URL. URLs with userIds can be managed by users when they are logged in.
![whiteboard_exported_image-2](https://github.com/remuskwan/url-shortener/assets/36059985/9e88ad70-69b8-45fb-9ebb-22d755745e2d)

The following diagram illustrates the general flow E2E of several functionalities of the application.
![whiteboard_exported_image](https://github.com/remuskwan/url-shortener/assets/36059985/84b64370-8123-4f04-8fe2-3f3dd720eef9)

### Handling Encoding Collisions

URLs are assigned a unique hash generated using a hash-and-salt algorithm (SHA256), which is then encoded for display. For the purposes of this project, the encoding is in base62. We then take the first 6-8 letters to form the shortened URL.

This approach poses several problems:

- If multiple users enter the same URL, they can get the same shortened URL

To avoid this, initial URLs are appended with a unique identifier (32-character random string) before it is hashed and encoded.

```js
export const shortenURL = (originalURL: string): string => {
  const uniqueString = `${originalURL}-${randomUUID()}`
  // Hash the unique string
  const hash = createHash('sha256').update(uniqueString).digest()
  // Encode in base-62
  const encoded = encodeBase62(hash)
  // Trim to a fixed length
  const shortened = encoded.slice(0, 8)

  return shortened
}
```

## Future Improvements

### Features

Due to time constraints, certain functionalities have yet to be implemented:

- Password validation to ensure accounts are created with strong passwords.
- Search/filter functionality for user-created URLs.
- Implement soft delete for user and URLs
- Migrate to NoSQL (eg. MongoDB, DynamoDB) due to the relatively few relations and the potential performance improvement
- Standalone Key Generation Store that generates random strings beforehand and stores them in a database
- Forgot password + email verification
- Account management such as updating profile, deleting account etc.
- Authentication using OAuth providers (eg. Google, Apple, GitHub etc.)
- Distinct look and feel to the application.

### Performance

- Database partitioning/sharding for scalability
- Cache to store frequently accessed URLs

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
```

---
