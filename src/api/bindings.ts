interface Environment {
  cloudflare: {
    env: Env
    ctx: ExecutionContext
  }
}

export interface Bindings {
  Bindings: Environment
}
