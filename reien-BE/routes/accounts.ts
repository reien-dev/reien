import { Hono } from "hono"

export const accounts = new Hono()

accounts.post("/singup", async (c) => {
    const body = JSON.parse(await c.req.json())
})

accounts.post("/login", async (c) => {
    const body = JSON.parse(await c.req.json())
})

