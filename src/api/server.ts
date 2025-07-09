import { Hono } from "hono"
import { logger } from "hono/logger"

import { routes } from "./routes/routes"

export const server = new Hono()
  .basePath("/api")
  .use(logger())
  .route("/", routes)

export type ServerType = typeof server
