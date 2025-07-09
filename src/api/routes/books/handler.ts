import type { Context } from "hono"

export const listBooks = (c: Context) => {
  return c.json({ message: "List of all books" })
}

export const getBook = (c: Context) => {
  const { id } = c.req.param()
  return c.json({ message: `Details for book ${id}` })
}

export const createBook = async (c: Context) => {
  const body = await c.req.json<unknown>()
  return c.json({ message: "Book created", data: body }, 201)
}
