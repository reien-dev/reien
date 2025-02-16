import { Hono } from "hono"
import { api } from "./routers"

const app = new Hono();

app.route("/", api);

export default app