import { Hono } from "hono"

import { books } from "./books/_route"
import { index } from "./index/_route"

export const routes = new Hono().route("/", index).route("/books", books)
