import { Hono, type Context } from "hono"

import type { Bindings } from "~/api/bindings"

import { getD1Database } from "~/db/database.server"
import { books } from "~/db/schema/books.sql"

import { createValidator } from "./validator"

/**
 * @param c Hono context, pass <Bindings> to get access to Cloudflare bindings
 * @returns
 */
export const listBooks = async (c: Context<Bindings>) => {
  const db = getD1Database(c.env.cloudflare.env.DB)
  const books = await db.query.books.findMany()

  return c.json({ books })
}

/**
 * You can also define handler with `new Hono()`
 */
export const createBookHandler = new Hono<Bindings>().post(
  "/",
  createValidator,
  async (c) => {
    const body = c.req.valid("json")
    const db = getD1Database(c.env.cloudflare.env.DB)

    const book = await db.insert(books).values(body).returning()

    return c.json({ book })
  },
)
