import { Hono } from "hono"
import { accounts } from "./routes/accounts"
import db from "./models/database"

(async function(){
console.log(await db.init());
})();

const app =  new Hono()

app.route("/api/accounts", accounts)

export default app