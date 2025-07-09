import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
})

export const validateBook = zValidator("json", bookSchema)
