import { compose } from "opencode-plugin-compose"
import { inspector } from "opencode-plugin-inspector"
import { notification } from "opencode-plugin-notification"

export const main = compose([
  inspector({ port: 6969 }),
  notification({ idleTime: 0, getMessage: () => "fuck you" }),
  ({ client }) => {
    return {
      "chat.params": async (input) => {
        const model = input.model.id

        const session = (await client.session.list()).data?.at(0)
        if (!session) return

        const firstMessage = (
          await client.session.messages({
            path: {
              id: session.id,
            },
          })
        ).data?.at(0)

        // This means the session has just started
        // So basically only allows GPT 4.1 as the conversation starter
        if (input.message.id === firstMessage?.info.id && model !== "gpt-4.1") {
          throw new Error("Use GPT 4.1 as the conversation starter")
        }
      },
    }
  },
])
