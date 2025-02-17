import { Hono } from "hono"
import { api } from "./routers"
import { db } from "./models/sqlite/init"

const app = new Hono();

app.route("/", api);

export default app