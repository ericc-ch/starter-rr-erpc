import { Context } from "effect"

export class Books extends Context.Tag("Books")<
  Books,
  {
    readonly list: () => Promise<unknown>
  }
>() {}
