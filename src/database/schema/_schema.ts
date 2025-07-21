import { books } from "./books.sql"

export const schema = {
  books: books,
}

export type DatabaseSchema = typeof schema
