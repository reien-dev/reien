import { Hono } from "hono"
import  { accounts } from "./routes/accounts"

const app =  new Hono()

app.route("/api/accounts", accounts)

export default app