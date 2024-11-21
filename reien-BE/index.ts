import { Hono } from "hono"
import { Low } from "lowdb"

const app = new Hono()

app.post("/api/login", async (c) => {
  const account = await c.req.json()
  console.log(account)
  const token: string = "a"
  return c.json({ "token": token })
})

export default app
