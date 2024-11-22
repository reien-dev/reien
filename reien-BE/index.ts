import { Hono } from "hono"
import user from "./user"

const app = new Hono()

app.post("/api/login", async (c) => {
  const body = JSON.parse(await c.req.json())
  const username: string = body.username
  const password: string = body.password
  return c.json({})
})

app.post("/api/singup", async (c) => {
  const body = JSON.parse(await c.req.json())
  const email: string = body.email
  const username: string = body.username
  const password: string = body.password
  return c.json({})
})

export default app