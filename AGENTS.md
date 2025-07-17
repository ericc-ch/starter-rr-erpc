# AGENTS.md

## Commands
- **Build**: `pnpm run build`
- **Dev**: `pnpm run dev`
- **Test**: `pnpm run test` or `vitest` (single test: `vitest path/to/test.test.tsx`)
- **Lint**: `pnpm run lint` (fix: `pnpm run lint --fix`)
- **Typecheck**: `pnpm run typecheck`
- **Database**: `pnpm run db:generate` (schema), `pnpm run db:migrate:local` (apply)

## Code Style
- **Formatting**: Formatting is handled by ESLint. Run `pnpm run lint --fix` to format code.
- **Package Manager**: Use `pnpm` exclusively
- **Imports**: Use `~/` alias for src/, no relative imports beyond parent directory
- **Types**: Strict TypeScript, explicit return types for exported functions
- **React**: Functional components with proper typing (`Route.ComponentProps`)
- **API**: Hono framework, handlers in separate files, use Zod validation
- **Database**: Drizzle ORM with SQLite, schemas in `~/db/schemas/`
- **Naming**: camelCase for functions/variables, PascalCase for components
- **JSDoc**: Document public API functions with proper param/return types
- **Error Handling**: Use appropriate HTTP status codes, validate inputs
- **Max Params**: Functions limited to 5 parameters (ESLint rule)
- **Documentation Updates**: When code changes make any part of AGENTS.md outdated or no longer relevant, update AGENTS.md to accurately reflect the current state of the codebase.