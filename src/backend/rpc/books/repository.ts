import { eq } from "drizzle-orm"
import { Effect } from "effect"

import { books } from "~/database/schema/books.sql"
import { Database } from "~/services/database"

export class BookRepository extends Effect.Service<BookRepository>()(
  "BookRepository",
  {
    effect: Effect.gen(function* () {
      const db = yield* Database

      return {
        findMany: Effect.gen(function* () {
          const result = yield* db.select().from(books)
          return result
        }),

        findById: (id: number) =>
          Effect.gen(function* () {
            const result = yield* db
              .select()
              .from(books)
              .where(eq(books.id, id))

            if (result.length === 0) {
              return yield* Effect.fail(`Book not found: ${id}`)
            }

            return result[0]
          }),

        delete: (id: number) =>
          Effect.gen(function* () {
            yield* db.delete(books).where(eq(books.id, id))

            const result = yield* db
              .select()
              .from(books)
              .where(eq(books.id, id))

            return result.length === 0
          }),

        create: (payload: { title: string; author: string }) =>
          Effect.gen(function* () {
            const result = yield* db
              .insert(books)
              .values({
                title: payload.title,
                author: payload.author,
              })
              .returning()

            return result[0]
          }),
      }
    }),
  },
) {}
