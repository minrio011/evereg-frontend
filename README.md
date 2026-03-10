# evereg-web

Next.js web app for the EvereG campaign:
- User-facing registration flow
- Admin login + dashboard for viewing/exporting registrations

## Getting Started

### Prerequisites

- Node.js 20+
- A running API server

### Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

`NEXT_PUBLIC_API_URL` is required for:
- user registration API calls
- admin login + protected dashboard requests

### Run Dev Server

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

```bash
npm run dev     # start dev server
npm run lint    # run ESLint
npm run build   # create production build
npm run start   # run production server (after build)
```

## Routes

- User flow
  - `/` landing page
  - `/selection` event selection
  - `/register?event=<id>` registration form
  - `/success` success page
  - `/privacy` privacy policy
- Admin
  - `/admin/login` login page
  - `/admin/dashboard` protected dashboard

## Docker (Production Build)

The Docker build expects `NEXT_PUBLIC_API_URL` at build time:

```bash
docker build --build-arg NEXT_PUBLIC_API_URL="https://api.example.com" -t evereg-web .
docker run -p 3000:3000 evereg-web
```

## Notes

- Admin auth is token-based (stored in `localStorage`) and the dashboard performs an API check to validate the token before rendering.

## Learn More (Next.js)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
