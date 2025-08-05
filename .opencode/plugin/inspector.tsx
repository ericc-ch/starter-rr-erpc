import type { Plugin } from "@opencode-ai/plugin"

import { Hono } from "hono"
import { serve } from "srvx"

// Global scope is executed once, during init

const PORT = 6969

const server = new Hono().get("/", (c) => {
  return c.text("API routes are working!")
})

serve({
  fetch: server.fetch,
  port: PORT,
})

export const inspector: Plugin = ({ $, client }) => {
  // Function scope is also executed once, during init

  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        const sessions = (await client.session.list()).data
        let message = "Task completed"

        const session = sessions?.find(
          (session) => session.id === event.properties.sessionID,
        )

        if (session) {
          message = `Task completed: ${session.title}`
        }

        await $`notify-send --app-name "opencode" "${message}"`

        return
      }
    },
  }
}
