import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const getAuth = () =>
  betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite", // or "pg" or "mysql"
    }),
  })
