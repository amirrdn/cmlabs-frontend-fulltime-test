# CMLabs Frontend Test

Simple meal browser using TheMealDB API.

## Pages

- `/` Ingredient list + search (frontend)
- `/ingredient/[name]` Meals by ingredient + search (frontend)
- `/meal/[id]` Meal detail (image, ingredients, instructions, YouTube)

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TheMealDB API

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
