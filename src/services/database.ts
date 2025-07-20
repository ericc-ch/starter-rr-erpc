import * as Drizzle from "@effect/sql-drizzle/Sqlite"
import { Effect } from "effect"

import { schema } from "~/db/schema/_schema"

export class Database extends Effect.Service<Database>()("service/Database", {
  effect: Drizzle.make({
    schema: schema,
  }),
}) {}
