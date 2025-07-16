import { ConfigProvider, Effect, Layer, pipe } from "effect"

import { server } from "~/api/api.server"
import { RuntimeContext } from "~/api/services/runtime-context"

import type { Route } from "./+types/_api"

const routeToHono = (params: Route.LoaderArgs) => {
  const callHono = async () =>
    await server.fetch(params.request, params.context)

  const RuntimeContextLive = Layer.succeed(
    RuntimeContext,
    RuntimeContext.of({
      context: params.context,
    }),
  )

  const apiCall = pipe(
    Effect.tryPromise(() => callHono()),
    Effect.withConfigProvider(ConfigProvider.fromJson(params.context)),
  )
  return pipe(Effect.provide(apiCall, RuntimeContextLive), Effect.runPromise)
}

export async function loader(params: Route.LoaderArgs) {
  return await routeToHono(params)
}

export async function action(params: Route.LoaderArgs) {
  return await routeToHono(params)
}

/**
 * Everything in this route is routed using Hono
 * We're essentially mounting Hono router on top of React Router
 */
