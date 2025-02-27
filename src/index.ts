import { Hono } from "hono"
import { api } from "./routers"
import { init } from "./models/sqlite/init"

await init()
const app = new Hono();

app.route("/", api);

export default app