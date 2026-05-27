# Campaign Manager

A React app for managing advertising campaigns. Sellers can create, remove, update and read campaigns, with an emerald balance that adjusts automatically as campaign funds are allocated or returned.

## Features

- Create, remove, update and read campaigns
- Emerald balance updates in real time as funds are allocated
- Keyword typeahead with chip selection and backspace removal
- Form validation with Zod
- State persisted to `localStorage`
- WCAG 2.1 AA accessibility

## Tech stack

- React 19.2
- react-error-boundary 6
- react-hook-form 7
- react-icons 5
- zod 4
- @hookform/resolvers 5
- CSS Modules
- TypeScript 6
- Vite 8
- Vitest 4
- @testing-library/react 16
- jsdom 29
- ESLint 10
- typescript-eslint 8
- Prettier 3
- Husky 9
- lint-staged 17

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Start dev server                    |
| `pnpm build`     | Type-check and build for production |
| `pnpm test`      | Run tests in watch mode             |
| `pnpm typecheck` | Run TypeScript type checking        |
| `pnpm lint`      | Run ESLint                          |
| `pnpm format`    | Run Prettier                        |
| `pnpm validate`  | Run all checks + build              |

## Project structure

```
src/
  components/
    campaigns/    # domain components for campaign list, item, and form
    layout/       # app shell and header
    ui/           # reusable, domain-agnostic UI primitives
  data/           # mock seed data
  hooks/          # state management and localStorage persistence
  schemas/        # Zod validation schemas
  types/          # shared TypeScript interfaces
```
