import { Hono } from "hono"

const app = new Hono().basePath("/api")

app.get("/", (c) =>
  c.json({
    req: c.req,
    var: c.var,
  }),
)

export { app }
