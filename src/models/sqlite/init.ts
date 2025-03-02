import { Database } from "bun:sqlite"
import config from "./../../config.toml"

let db: Database;

export async function init() {
    if (!db) {
    db = new Database(config.sqlite.path, { create: true });
    db.query("CREATE TABLE IF NOT EXISTS clients(id TEXT, name TEXT, website TEXT, scopes TEXT, redirect_uri: TEXT)") //apps
    db.query("CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, created_at TEXT, updated_at TEXT, email TEXT, encrypted_password)").run();
    console.log("init sqlite");
    }
    return db;
}


