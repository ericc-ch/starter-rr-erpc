import { Hono } from "hono"

export const index = new Hono().get("/", (c) => {
  return c.text("API routes are working!")
})
