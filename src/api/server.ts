import { Hono } from "hono"

const server = new Hono().basePath("/api")

server.get("/", (c) =>
  c.json({
    req: c.req,
    var: c.var,
  }),
)

export { server }
