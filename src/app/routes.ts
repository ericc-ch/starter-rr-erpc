import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("./routes/home/_route.tsx"),
  route("/api/*", "./routes/_api.tsx"),
] satisfies RouteConfig
