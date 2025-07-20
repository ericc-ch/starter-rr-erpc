import * as sqlite from "drizzle-orm/sqlite-core"

import { createInsertSchema, createSelectSchema } from "~/lib/drizzle-effect"

export const books = sqlite.sqliteTable("books", {
  id: sqlite.integer().primaryKey({ autoIncrement: true }),
  title: sqlite.text().notNull(),
  author: sqlite.text().notNull(),
})

export const BookInsertSchema = createInsertSchema(books)
export const BookSelectSchema = createSelectSchema(books)
