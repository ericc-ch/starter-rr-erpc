import { Hono } from "hono"

import type { Bindings } from "~/api/bindings"

import { getDB } from "~/db/database.server"

import { createBookHandler, listBooks } from "./handler"
import { getValidator } from "./validator"

/**
 * Example API routes
 */

export const books = new Hono<Bindings>()
  .get("/", listBooks)
  /**
   * Write route handler here to actually use c.req.valid (validator)
   * I don't know yet how to supply the typing
   */
  .get("/:id", getValidator, (c) => {
    const params = c.req.valid("param")
    const db = getDB(c.env.cloudflare.env.DB)

    const book = db.query.books.findFirst({
      where: (books, { eq }) => eq(books.id, params.id),
    })

    return c.json({ book })
  })
  /**
   * Adding route that is defined using `new Hono()`
   */
  .route("/", createBookHandler)
