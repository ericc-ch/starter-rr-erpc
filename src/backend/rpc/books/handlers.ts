import { Effect, Layer, Stream } from "effect"

import { BookRepository } from "./repository"
import { BookRPCs } from "./requests"

export const BooksLive = BookRPCs.toLayer(
  Effect.gen(function* () {
    const repository = yield* BookRepository

    return {
      BookList: () =>
        Effect.gen(function* () {
          const books = yield* repository.findMany.pipe(
            Effect.catchAll(() => Effect.succeed([])),
          )
          return Stream.fromIterable(books)
        }).pipe(Stream.unwrap),

      BookGet: ({ id }) =>
        repository.findById(id).pipe(Effect.mapError(String)),

      BookDelete: ({ id }) =>
        repository
          .delete(id)
          .pipe(
            Effect.mapError(
              (error) => `Failed to delete book: ${error.message}`,
            ),
          ),

      BookCreate: (payload) =>
        repository
          .create(payload)
          .pipe(
            Effect.mapError(
              (error) => `Failed to create book: ${error.message}`,
            ),
          ),
    }
  }),
).pipe(Layer.provide(BookRepository.Default))
