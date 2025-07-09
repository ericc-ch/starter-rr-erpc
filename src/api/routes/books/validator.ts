import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
})

export const getValidator = zValidator("param", z.object({ id: z.number() }))

export const createValidator = zValidator("json", bookSchema)
