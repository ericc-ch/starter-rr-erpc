import type { Context } from "hono"

import type { Bindings } from "~/api/bindings"

import { getDB } from "~/db/db"
import { booksTable } from "~/db/schemas/books.sql"

export const listBooks = async (c: Context<Bindings>) => {
  const db = getDB(c.env.cloudflare.env.DB)
  console.log(db)

  const books = await db.select().from(booksTable)
  return c.json({ books })
}

export const getBook = (c: Context) => {
  const { id } = c.req.param()
  return c.json({ message: `Details for book ${id}` })
}

export const createBook = async (c: Context) => {
  const body = await c.req.json<unknown>()
  return c.json({ message: "Book created", data: body }, 201)
}
