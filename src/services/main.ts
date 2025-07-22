import type { AppLoadContext } from "react-router"

import { D1Client } from "@effect/sql-d1"
import { Layer } from "effect"

import { Auth } from "./auth"
import { Database } from "./database"
import { Runtime } from "./runtime"

export function buildMainService(context: AppLoadContext) {
  const RuntimeLive = Layer.succeed(
    Runtime,
    Runtime.of({
      context,
    }),
  )

  const D1Live = D1Client.layer({
    db: context.cloudflare.env.D1,
  })

  const DatabaseLive = Database.Default.pipe(Layer.provide(D1Live))
  const AuthLive = Auth.Default.pipe(Layer.provide(DatabaseLive))

  const MainLive = Layer.mergeAll(AuthLive, DatabaseLive, RuntimeLive)

  return MainLive
}
