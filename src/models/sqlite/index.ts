import { Database } from "bun:sqlite"
import config from "../../config.toml"

const db = new Database(config.sqlite.path, { create: true });
db.query("CREATE TABLE IF NOT EXISTS users(id text, username text, hashpass text, email text)").run();
db.query("CREATE TABLE IF NOT EXISTS token (id text, token text, created_at text)").run()
