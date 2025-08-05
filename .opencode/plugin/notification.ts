import type { Plugin } from "@opencode-ai/plugin"

// Global scope is executed once, during init

// 1 minute
const IDLE_TIME = 1000 * 60
const NOTIFICATION_COMMAND = `canberra-gtk-play -i complete`

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
        await client.app.log({
          body: {
            level: "info",
            message: `Set lastUserMessage to ${lastUserMessage}`,
            service: "notification",
          },
        })
      }

      if (event.type === "session.idle") {
        const timeSince = Date.now() - lastUserMessage
        if (timeSince < IDLE_TIME) {
          await client.app.log({
            body: {
              level: "info",
              message: `Skipping notification, time since last user message: ${timeSince}`,
              service: "notification",
            },
          })
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
          message = session.title
        }

        await client.app.log({
          body: {
            level: "info",
            message,
            service: "notification",
          },
        })
        await $`notify-send --app-name "opencode" "${message}"`
        await $`${NOTIFICATION_COMMAND}`
      }
    },
  }
}
