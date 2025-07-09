import { hc } from "hono/client"

import type { ServerType } from "~/api/server"

export const rpc = hc<ServerType>("http://localhost:5173/api/")
