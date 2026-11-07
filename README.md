# Ebube Udorie (Technikraft) – Portfolio

Personal engineering portfolio and full-stack system built with Next.js (App Router), React, TypeScript, Tailwind CSS, and Supabase.

## Flagship Projects Featured

- **Scholarium:** University academic app for students & freshers (Team Lead & Full-Stack / Mobile Engineer) with real-time multiplayer quizzes, AI PDF lecture analysis, step-by-step mathematics solver, and campus timetables.
- **Mastery Lab:** Free interactive learning platform for mastering HTML & CSS with in-browser live code preview, automated DOM testing, quizzes, and global competitive leaderboards.
- **Springlight Commerce:** Enterprise multi-store inventory, real-time sales logging, and retail POS platform built at Springlight Technology.
- **Venicio Boutique:** Luxury fashion e-commerce storefront with responsive apparel catalog, client-side cart, and verified Paystack checkout.

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in Supabase and admin values
npm run dev                  # http://localhost:3000
```

### Scripts

- `npm run dev`: Start Next.js development server
- `npm run build`: Production build
- `npm run typecheck`: Run TypeScript compiler validation
- `npm run lint`: Run ESLint check

## Project Structure

```
src/
  app/                  Routes, metadata and SEO files (Next.js App Router)
    admin/              Full Supabase CRUD admin portal
    api/                API routes (admin auth, media uploads, contact form)
    cv/                 Dynamic CV streaming route
    projects/           Case study pages for flagship projects
    llms.txt/           /llms.txt for AI assistants
  content/              Typed portfolio content (profile, projects, skills, education)
  components/           UI components, layouts, interactive canvases
  lib/                  Server repositories, Supabase client, utilities
public/
  ebube-udorie-cv.pdf   Compiled professional ATS-friendly CV
  projects/             Vector project graphics and illustrations
```
