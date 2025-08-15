/**
 * File name is api.server.ts because *.server.ts marks the file as a server module
 * I don't want to wrap the whole directory inside a .server folder
 * So instead I'm just marking the entry file as a .server
 *
 * https://reactrouter.com/api/framework-conventions/server-modules
 */

import {
  HttpApi,
  HttpApiBuilder,
  HttpApiEndpoint,
  HttpApiError,
  HttpApiGroup,
  HttpApp,
  HttpRouter,
  HttpServerResponse,
} from "@effect/platform"
import { Effect, pipe, Schema } from "effect"

import { BookSelectSchema } from "~/database/schema/books.sql"

import { BookRepository } from "./rpc/books/repository"

const API = HttpApi.make("API")
  .add(
    HttpApiGroup.make("hello-world").add(
      HttpApiEndpoint.get("hello-word", "/").addSuccess(Schema.String),
    ),
  )
  .add(
    HttpApiGroup.make("books")
      .add(
        HttpApiEndpoint.get("get-all", "/")
          .addSuccess(Schema.Array(BookSelectSchema))
          .addError(HttpApiError.InternalServerError),
      )

      .prefix("/books"),
  )

const helloWorldLive = HttpApiBuilder.group(API, "hello-world", (handlers) =>
  handlers.handle("hello-word", () => Effect.succeed("Hello World")),
)

const booksLive = HttpApiBuilder.group(API, "books", (handlers) =>
  Effect.gen(function* () {
    const repository = yield* BookRepository

    return handlers.handle("get-all", () =>
      pipe(
        repository.findMany(),
        Effect.mapError(() => new HttpApiError.InternalServerError()),
      ),
    )
  }),
)

const router = HttpRouter.empty.pipe(
  HttpRouter.get("/", HttpServerResponse.text("Hello World")),
)

export const handler = HttpApp.toWebHandler(router)
