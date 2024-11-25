import { Database } from "bun:sqlite"
import config from "../../config.toml"

let db = undefined;

async function init(){
    if(!db){
        db = new Database(config.database.sqlite.path, { create: true });
        db.query("CREATE TABLE IF NOT EXISTS users(username text, hash text, email text)").run();
    }
}

function sqlite_escape(value:string) {
    return value.replace(/'/g, "''");
}

async function add_user(username:string, hashpass:string, email:string) {
    let q = db.query(`SELECT * FROM users WHERE username = '${sqlite_escape(username)}' OR email = '${sqlite_escape(email)}'`).all()[0];
    if(q) return false;
    db.query(`INSERT INTO users VALUES('${sqlite_escape(username)}', '${sqlite_escape(hashpass)}', '${sqlite_escape(email)}')`).run();
    return true;
}

async function login(username:string, password:string) {
    let q = db.query(`SELECT * FROM users WHERE username = '${sqlite_escape(username)}'`).all()[0];
    if(!q) return false;
    return await Bun.password.verify(password, q.hash);
}

export default {init, add_user, login}