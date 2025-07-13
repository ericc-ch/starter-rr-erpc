import { drizzle } from "drizzle-orm/d1"

import { books } from "./schemas/books.sql"

export const getDB = (db: D1Database) =>
  drizzle(db, {
    schema: {
      books,
    },
  })
