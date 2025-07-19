import { Context } from "effect"

import type { DrizzleDatabase } from "~/db/database.server"

export class Database extends Context.Tag("Database")<
  Database,
  {
    readonly db: DrizzleDatabase
  }
>() {}
