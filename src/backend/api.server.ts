/**
 * File name is api.server.ts because *.server.ts marks the file as a server module
 * I don't want to wrap the whole directory inside a .server folder
 * So instead I'm just marking the entry file as a .server
 *
 * https://reactrouter.com/api/framework-conventions/server-modules
 */

import { HttpApp, HttpRouter, HttpServerResponse } from "@effect/platform"

const router = HttpRouter.empty.pipe(
  HttpRouter.get("/", HttpServerResponse.text("Hello World")),
)

export const handler = HttpApp.toWebHandler(router)
