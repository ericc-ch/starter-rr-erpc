import type { LibSQLDatabase } from "drizzle-orm/libsql"

import { type DrizzleD1Database } from "drizzle-orm/d1"

import { type DatabaseSchema } from "./schema/_schema"

// LibSQL is used for in memory testing database
export type DrizzleDatabase =
  | DrizzleD1Database<DatabaseSchema>
  | LibSQLDatabase<DatabaseSchema>
