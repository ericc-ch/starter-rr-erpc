import { Context } from "effect"

import type { Bindings } from "~/api/bindings"

export class RuntimeContext extends Context.Tag("RuntimeContext")<
  RuntimeContext,
  {
    readonly context: Bindings["Bindings"]
  }
>() {}
