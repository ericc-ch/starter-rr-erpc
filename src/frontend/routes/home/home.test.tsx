import { expect, test } from "vitest"
import { render } from "vitest-browser-react"

test("renders h1", async () => {
  const result = render(<h1>Home</h1>)

  await expect.element(result.getByText("Home")).toBeInTheDocument()
})
