import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
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
