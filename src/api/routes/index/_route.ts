import { Hono } from "hono"

import type { Bindings } from "~/api/bindings"

export const index = new Hono<Bindings>().get("/", (c) => {
  return c.json({ req: c.req, env: c.env })
})
