import { server } from "~/api/server"

import type { Route } from "./+types/_api"

export async function loader({ request, context }: Route.LoaderArgs) {
  return await server.fetch(request, context)
}

export async function action({ request, context }: Route.ActionArgs) {
  return await server.fetch(request, context)
}
