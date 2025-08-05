import type { Plugin } from "@opencode-ai/plugin"

// Global scope is executed once, during init

// 1 minute
const IDLE_TIME = 1000 * 60
const NOTIFICATION_SOUND = "complete"

let lastUserMessage = Date.now()

export const notification: Plugin = ({ $, client }) => {
  // Function scope is also executed once, during init

  return {
    event: async ({ event }) => {
      if (
        event.type === "message.updated"
        && event.properties.info.role === "user"
      ) {
        lastUserMessage = Date.now()
      }

      if (event.type === "session.idle") {
        if (Date.now() - lastUserMessage < IDLE_TIME) {
          return
        }

        // fetching it here otherwise it will be stale
        // because the other scopes are executed just once
        const sessions = (await client.session.list()).data
        let message = "Task completed"

        const session = sessions?.find(
          (session) => session.id === event.properties.sessionID,
        )

        if (session) {
          message = `Task completed: ${session.title}`
        }

        await $`notify-send --app-name "opencode" "${message}"`
        await $`canberra-gtk-play -i ${NOTIFICATION_SOUND}`

        return
      }
    },
  }
}
