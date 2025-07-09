import config from "@echristian/eslint-config"

/**
 * @type {import("@echristian/eslint-config").Config}
 */
const eslintConfig = config(
  {
    ignores: ["worker-configuration.d.ts"],
    jsx: {
      enabled: true,
      a11y: true,
    },
    react: {
      enabled: true,
    },
    reactHooks: {
      enabled: true,
    },
  },
  {
    rules: {
      "max-params": ["error", { max: 5 }],
    },
  },
)

export default eslintConfig
