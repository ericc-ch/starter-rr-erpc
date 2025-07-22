# AGENTS.md

## Commands

- **Build**: `bun run build`
- **Dev**: `bun run dev`
- **Test**: `bun run test` or `vitest` (single test: `vitest path/to/test.test.tsx`)
- **Lint (all files)**: `bun run lint:all` (auto-fix: `bun run lint:all --fix`)
- **Lint staged files (pre-commit)**: `bun run lint`
- **Typecheck**: `bun run typecheck`
- **Database**: `bun run db:generate` (schema), `bun run db:migrate:local` (apply)

## Code Style

- **Formatting**: Use ESLint (`bun run lint:all --fix` for all files, or `bun run lint` for staged files). Follows `@echristian/eslint-config` (TypeScript, React, hooks, a11y, max 5 params).
- **Imports**: Use `~/` alias for `src/`, avoid deep relative imports.
- **Types**: Strict TypeScript; all exported functions/components must have explicit return types.
- **React**: Functional components only, typed with `Route.ComponentProps`.
- **API**: Use Hono framework; handlers in separate files; validate with Zod.
- **Database**: Drizzle ORM (SQLite); schemas in `~/db/schema/`.
- **Naming**: camelCase for variables/functions, PascalCase for components.
- **JSDoc**: Document all public API functions with param/return types.
- **Error Handling**: Use correct HTTP status codes, validate all inputs.
- **Max Params**: Functions limited to 5 parameters (ESLint enforced).
- **Pre-commit**: Lint staged files with auto-fix.
- **Documentation**: Update AGENTS.md if code changes make it outdated.
