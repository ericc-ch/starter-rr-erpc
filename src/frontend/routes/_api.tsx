import { handler } from "~/backend/handler.server"

import type { Route } from "./+types/_api"

export async function loader({ request, context }: Route.LoaderArgs) {
  return await handler(request, context)
}

export async function action({ request, context }: Route.ActionArgs) {
  return await handler(request, context)
}

/**
 * Everything in this route is routed using Hono
 * We're essentially mounting Hono router on top of React Router
 */
