import type { SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy"
import type { AppLoadContext } from "react-router"

import { D1Client } from "@effect/sql-d1"
import * as Drizzle from "@effect/sql-drizzle/Sqlite"
import { drizzle } from "drizzle-orm/d1"
import { Context, Effect, Layer, pipe } from "effect"

import { schema, type DatabaseSchema } from "~/db/schema/_schema"

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

  class DatabaseTyped extends Context.Tag("DatabaseTyped")<
    DatabaseTyped,
    {
      readonly db: SqliteRemoteDatabase<DatabaseSchema>
    }
  >() {}

  const DatabaseTypedLive = Layer.effect(
    DatabaseTyped,
    pipe(
      Drizzle.make({ schema }),
      Effect.map((db) => ({ db })),
    ),
  )

  pipe(
    Effect.gen(function* () {
      const db = yield* DatabaseTyped
      db.db.query.books.findFirst()
    }),
    Effect.provide(D1Live),
    Effect.provide(DatabaseTypedLive),
  )

  const DrizzleLive = pipe(
    Drizzle.layerWithConfig({ schema }),
    Layer.provide(D1Live),
  )

  const DatabaseLive = Layer.effect(
    Database,
    pipe(
      Runtime,
      Effect.map((runtime) => {
        const db = drizzle(runtime.context.cloudflare.env.D1, {
          schema: schema,
        })

        return {
          db,
        }
      }),
    ),
  )

  return pipe(DatabaseLive, Layer.provide(RuntimeLive))
}
