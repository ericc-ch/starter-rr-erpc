import type { Plugin } from "@opencode-ai/plugin"
import type { ReadableStreamController } from "node:stream/web"

import { Hono } from "hono"
import { streamSSE } from "hono/streaming"
import fs from "node:fs"
import path from "node:path"
import { serve } from "srvx"

// Global scope is executed once, during init

const PORT = 6969

const html = fs.readFileSync(
  path.join(import.meta.dirname, "inspector-view.html"),
  "utf8",
)

let hooksController: ReadableStreamController<unknown>
const hooksStream = new ReadableStream<unknown>({
  start(_controller) {
    hooksController = _controller
  },
})

const app = new Hono()
  .get("/", (c) => {
    return c.text(html, 200, {
      "Content-Type": "text/html",
    })
  })
  .get("/hooks", (c) => {
    return streamSSE(c, async (stream) => {
      const reader = hooksStream.getReader()

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        await stream.writeSSE({
          data: JSON.stringify(value),
          event: "hook",
        })
      }
    })
  })

const server = serve({
  fetch: app.fetch,
  port: PORT,
  silent: true,
})

// Ping otherwise bun will close the connection
const interval = setInterval(() => {
  hooksController.enqueue({ hook: "ping" })
}, 5_000)

export const inspector: Plugin = () => {
  // Function scope is also executed once, during init

  return {
    event: (input) => {
      hooksController.enqueue({ hook: "event", input })
    },
    "chat.message": (input, output) => {
      hooksController.enqueue({ hook: "chat.message", input, output })
    },
    "chat.params": (input, output) => {
      hooksController.enqueue({ hook: "chat.params", input, output })
    },
    "permission.ask": (input, output) => {
      hooksController.enqueue({ hook: "permission.ask", input, output })
    },
    "tool.execute.after": (input, output) => {
      hooksController.enqueue({ hook: "tool.execute.after", input, output })
    },
    "tool.execute.before": (input, output) => {
      hooksController.enqueue({ hook: "tool.execute.before", input, output })
    },
  }
}

process.on("exit", () => {
  clearInterval(interval)
  hooksController.close()
  void server.close()
})
