import { Hono } from "hono"

import { books } from "./books/_route"
import { index } from "./index/_route"

/**
 * Add more API routes here
 * The way I would structure it
 * ./[route]/_route.ts - the route definition
 * ./[route]/handler.ts - the route handler
 * ./[route]/validator.ts - zod validators
 */

export const routes = new Hono().route("/", index).route("/books", books)
