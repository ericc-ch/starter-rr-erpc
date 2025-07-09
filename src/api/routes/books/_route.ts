import { Hono } from "hono"

import { listBooks, getBook, createBook } from "./handler"
import { validateBook } from "./validator"

export const books = new Hono()
  .get("/", listBooks)
  .get("/:id", getBook)
  .post("/", validateBook, createBook)
