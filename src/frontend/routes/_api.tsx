import { handler } from "~/backend/handler.server"

import type { Route } from "./+types/_api"

export async function loader({ request }: Route.LoaderArgs) {
  return await handler(request)
}

export async function action({ request }: Route.ActionArgs) {
  return await handler(request)
}
