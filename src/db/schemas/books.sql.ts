import * as sqlite from "drizzle-orm/sqlite-core"

export const books = sqlite.sqliteTable("books", {
  id: sqlite.integer().primaryKey({ autoIncrement: true }),
  title: sqlite.text().notNull(),
  author: sqlite.text().notNull(),
})
