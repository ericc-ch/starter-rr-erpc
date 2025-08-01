import { Rpc, RpcGroup } from "@effect/rpc"
import { Schema } from "effect"

import { BookSelectSchema, BookInsertSchema } from "~/database/schema/books.sql"

export class BookRPCs extends RpcGroup.make(
  Rpc.make("BookList", {
    success: BookSelectSchema,
    stream: true,
  }),

  Rpc.make("BookGet", {
    success: BookSelectSchema,
    error: Schema.String,
    payload: {
      id: Schema.Number,
    },
  }),

  Rpc.make("BookDelete", {
    success: Schema.Boolean,
    error: Schema.String,
    payload: {
      id: Schema.Number,
    },
  }),

  Rpc.make("BookCreate", {
    success: BookSelectSchema,
    error: Schema.String,
    payload: Schema.Struct(BookInsertSchema.fields),
  }),
) {}
