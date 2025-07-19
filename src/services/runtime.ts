import type { AppLoadContext } from "react-router"

import { Context } from "effect"

export class Runtime extends Context.Tag("Runtime")<
  Runtime,
  {
    readonly context: AppLoadContext
  }
>() {}
