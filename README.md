# AnyLLM2Music-frontend
Frontend UI for AnyLLM2Music

# Features

This repo includes the frontend UI for [AnyLLM2Music Backend](https://github.com/monitus2022/AnyLLM2Music-backend).

- Single page simple UI
- User input text description of a short music piece (<30 seconds) and let LLM create the melody in MIDI on backend.
- Returns midi object to frontend for preview
- User decides to convert to audio file with soundfonts selected, available for download

## Progress (MVP)

- [ ] Simple UI to enter description, returns midi
- [ ] Midi convert to music and available for download, allow choice of soundfonts
- [ ] Description generate music plan and available for preview, user interaction for updating
- [ ] Editing after generating midi at preview stage

# Dependencies

- `Next.js`

# Installation

## Prerequisites
- Node.js (version 16 or higher) - Download from [nodejs.org](https://nodejs.org/)
- npm (comes with Node.js) or yarn

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/monitus2022/AnyLLM2Music-frontend.git
   cd AnyLLM2Music-frontend

2. Install dependencies:
   ```bash
    npm install

3. Start the development server:

   ```bash
    npm run dev

4. Open http://localhost:3000 in your browser to view the app.

    (Optional) Build for production:
   ```bash
    npm run build
    npm start

---------------------------------------


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
