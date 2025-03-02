import { Database } from "bun:sqlite"
import config from "./../../config.toml"

let db: Database;

export async function init() {
    if (!db) {
    db = new Database(config.sqlite.path, { create: true });
    db.query("CREATE TABLE IF NOT EXISTS clients(id TEXT PRIMARY KEY, client_id TEXT, client_secret TEXT, name TEXT, redirect_uri: TEXT, scopes TEXT, website TEXT, vapid_key TEXT, created_at TEXT)") //apps
    db.query("CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, created_at TEXT, updated_at TEXT, email TEXT, encrypted_password)").run();
    console.log("init sqlite");
    }
    return db;
}


