import type { AppLoadContext } from "react-router"

import { D1Client } from "@effect/sql-d1"
import { Layer, pipe } from "effect"

import { Database } from "./database"
import { Runtime } from "./runtime"

export function buildAppService(context: AppLoadContext) {
  const RuntimeLive = Layer.succeed(
    Runtime,
    Runtime.of({
      context,
    }),
  )

  const D1Live = D1Client.layer({
    db: context.cloudflare.env.D1,
  })
  const DatabaseLive = pipe(Database.Default, Layer.provide(D1Live))
  const AppLive = Layer.merge(DatabaseLive, RuntimeLive)

  return AppLive
}
