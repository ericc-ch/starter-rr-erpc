import { betterAuth } from "better-auth"
import { drizzleAdapter, type DB } from "better-auth/adapters/drizzle"
import { Effect } from "effect"

import { Database } from "./database"

export class Auth extends Effect.Service<Auth>()("service/Auth", {
  effect: Effect.gen(function* () {
    const db = yield* Database
    return betterAuth({
      database: drizzleAdapter(db, { provider: "sqlite" }),
    })
  }),
}) {}

// Fake auth config so better-auth can resolve it

const fakeDB: DB = {}

export const auth = betterAuth({
  database: drizzleAdapter(fakeDB, { provider: "sqlite" }),
})
