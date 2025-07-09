/**
 * File name is api.server.ts because *.server.ts marks the file as a server module
 * I don't want to wrap the whole directory inside a .server folder
 * So instead I'm just marking the entry file as a .server
 *
 * https://reactrouter.com/api/framework-conventions/server-modules
 */

import { Hono } from "hono"
import { logger } from "hono/logger"

import { routes } from "./routes/routes"

/**
 * The reason we're using method chaining is because
 * somehow Hono RPC won't work without it, the typing is lost
 */

export const server = new Hono()
  .basePath("/api")
  .use(logger())
  .route("/", routes)

export type ServerType = typeof server
