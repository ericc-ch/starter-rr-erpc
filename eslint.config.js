import config from "@echristian/eslint-config"

export default config(
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
