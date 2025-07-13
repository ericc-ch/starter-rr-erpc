import { Context } from "effect"

import { getDB } from "~/db/database.server"

export class Database extends Context.Tag("Database")<
  Database,
  {
    readonly db: ReturnType<typeof getDB>
  }
>() {}
