## How to Use This Starter Template

This starter is a full-stack React application using React Router, Hono for the API, Drizzle ORM for the database, and is deployed on Cloudflare Pages.

### Getting Started

1.  **Clone the repository and install dependencies:**

    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    pnpm install
    ```

2.  **Set up your Cloudflare D1 Database:**

    The project is configured to use Cloudflare D1. The `wrangler.jsonc` file contains the necessary configuration.

    - To run locally, you don't need to change anything. The development server will use a local version of D1.
    - For staging and production, you will need to create your own D1 databases in your Cloudflare account and update the `database_id` in `wrangler.jsonc` for those environments.

3.  **Run the development server:**

    ```bash
    pnpm run dev
    ```

    This command starts the Vite development server, and your application will be available at `http://localhost:5173`.

### Project Structure

- `src/app`: Contains the React frontend application, with routing handled by React Router.
- `src/api`: Contains the Hono-based API server.
- `src/db`: Includes database-related files, such as Drizzle schemas and the database connection setup.
- `workers`: Contains the Cloudflare Worker entry point.

### Adding a New Page (React Router)

1.  Create a new directory under `src/app/routes`. For example, `src/app/routes/about`.

2.  Inside this new directory, create a `_route.tsx` file. This file will contain your React component.

    ```tsx
    // src/app/routes/about/_route.tsx
    export default function AboutPage() {
      return <h1>About Us</h1>;
    }
    ```

3.  Update `src/app/routes.ts` to include your new route.

    ```ts
    import { type RouteConfig, index, route } from "@react-router/dev/routes";

    export default [
      index("./routes/home/_route.tsx"),
      route("/about", "./routes/about/_route.tsx"), // Add your new route here
      route("/api/*", "./routes/_api.tsx"),
    ] satisfies RouteConfig;
    ```

### Adding a New API Endpoint (Hono)

The API routes are structured by feature under `src/api/routes`.

1.  Create a new folder for your feature, for example, `src/api/routes/users`.

2.  Inside this folder, create the following files:

    - `_route.ts`: Defines the Hono router for this endpoint.
    - `handler.ts`: Contains the business logic for your route handlers.
    - `validator.ts` (optional): Contains Zod schemas for validating request data.

3.  Wire up your new route in `src/api/routes/routes.ts`.

    ```ts
    import { Hono } from "hono";
    import { books } from "./books/_route";
    import { index } from "./index/_route";
    import { users } from "./users/_route"; // Import your new route

    export const routes = new Hono()
      .route("/", index)
      .route("/books", books)
      .route("/users", users); // Add your new route
    ```

### Interacting with the Database (Drizzle ORM)

1.  **Define your schema:** Create or modify a schema file in `src/db/schemas/`. For example, `books.sql.ts` defines the `books` table.

2.  **Generate migrations:** After changing a schema, run the generate command:

    ```bash
    pnpm run db:generate
    ```

    This will create a new SQL migration file in the `drizzle` directory.

3.  **Apply migrations:**

    - **Local:**
      ```bash
      pnpm run db:migrate:local
      ```
    - **Staging/Production:** You'll need to update the `<staging-db>` placeholder in `package.json` and run the corresponding script.

4.  **Query the database:** You can use the `getDB` function available in `src/db/db.server.ts` within your API handlers to get a Drizzle instance and query your database.

    ```ts
    // Example from src/api/routes/books/handler.ts
    import { getDB } from "~/db/db.server";

    export const listBooks = async (c: Context<Bindings>) => {
      const db = getDB(c.env.cloudflare.env.DB);
      const books = await db.query.books.findMany();
      return c.json({ books });
    };
    ```

### Deployment

This starter is configured for deployment to **Cloudflare Pages**.

1.  **Build your application:**

    ```bash
    pnpm run build
    ```

2.  **Deploy to production:**

    ```bash
    pnpm run deploy
    ```

    This command will build your application and deploy it using Wrangler to your configured Cloudflare account.
