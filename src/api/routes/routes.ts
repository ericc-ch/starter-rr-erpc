import { Hono } from "hono"

import { books } from "./books/_route"

export const routes = new Hono().route("/books", books)
