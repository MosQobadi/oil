# CLAUDE.md

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Prisma
- Neon PostgreSQL
- React Query
- React Hook Form + Zod
- Tailwind CSS v4
- Radix UI
- shadcn/ui patterns
- Vercel Blob storage

## Package Manager

pnpm

## Commands

- pnpm dev
- pnpm build
- pnpm lint

## Code Style

- Use TypeScript strict typing
- Avoid `any`
- Prefer server components by default
- Use client components only when needed
- Keep components focused and composable
- Prefer existing patterns over new abstractions
- Keep components less that 500 lines

## State Management

- Server state -> React Query
- Forms -> React Hook Form + Zod
- Local UI state -> useState

## Styling

- Prefer Tailwind utilities
- Reuse existing UI components
- Use cn() utility for class merging
- Avoid inline styles

## Data & Storage

- Database: Prisma + Neon PostgreSQL
- File uploads/images: Vercel Blob
- Preserve existing Prisma schema patterns
- Avoid unnecessary API route changes

## Constraints

- Minimal diff only
- Do not introduce new libraries unless requested
- Do not refactor unrelated files
- Preserve current architecture
