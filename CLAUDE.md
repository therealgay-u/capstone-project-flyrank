# Project Context for Claude

## Stack
- Frontend: React + Vite
- Language: TypeScript
- Styling: Tailwind CSS

## Conventions
- Components: PascalCase, one component per file
- Folders: /src/components, /src/pages, /src/hooks
- Commit format: Conventional Commits (feat, fix, docs, chore, refactor)

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm test` — run tests


# Project Rules

## Forms

Always use react-hook-form.

## Validation

Always validate using Zod.

## Accessibility

Every form input must have:

- label
- aria-invalid
- inline error message

## Testing

Every generated form must include validation tests before completion.

## Review

Never accept generated code without manual review.