import { app } from "~/api/app"

import type { Route } from "./+types/api"

export async function loader({ request, context }: Route.LoaderArgs) {
  return await app.fetch(request, context)
}

export async function action({ request, context }: Route.ActionArgs) {
  return await app.fetch(request, context)
}
