import { ConfigProvider, Effect, Layer, pipe } from "effect"

import { server } from "~/api/api.server"
import { Database } from "~/api/services/database"
import { RuntimeContext } from "~/api/services/runtime-context"
import { getDB } from "~/db/database.server"

import type { Route } from "./+types/_api"

const constRouteToHono = (params: Route.LoaderArgs) => {
  const callHono = async () =>
    await server.fetch(params.request, params.context)

  const RuntimeContextLive = Layer.succeed(
    RuntimeContext,
    RuntimeContext.of({
      context: params.context,
    }),
  )

  const DatabaseLive = Layer.effect(
    Database,
    Effect.gen(function* () {
      const context = yield* RuntimeContext
      const db = getDB(context.context.cloudflare.env.DB)
      return {
        db,
      }
    }),
  )

  const MainLive = pipe(DatabaseLive, Layer.provide(RuntimeContextLive))

  const apiCall = pipe(
    Effect.tryPromise(() => callHono()),
    Effect.withConfigProvider(ConfigProvider.fromJson(params.context)),
  )
  return pipe(Effect.provide(apiCall, MainLive), Effect.runPromise)
}

export async function loader(params: Route.LoaderArgs) {
  return await constRouteToHono(params)
}

export async function action(params: Route.LoaderArgs) {
  return await constRouteToHono(params)
}

/**
 * Everything in this route is routed using Hono
 * We're essentially mounting Hono router on top of React Router
 */
