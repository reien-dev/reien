import { Hono } from "hono"
import

const app = new Hono()

/*
{
  "username": "owasikohu",
  "password": "1145141919810"
}
*/

app.post("/api/login", async (c) => {
  const auth = JSON.parse(await c.req.json())
  const username: string = auth.username
  const password: string = auth.password
  return c.json
})

export default app