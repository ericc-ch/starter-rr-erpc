import { Context } from "effect"

import type { Bindings } from "../bindings"

export class RuntimeContext extends Context.Tag("RuntimeContext")<
  RuntimeContext,
  {
    readonly context: Bindings["Bindings"]
  }
>() {}
