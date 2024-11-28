import { Database } from "bun:sqlite"
import config from "./../../config.toml"
import date from "./../../utils/date"

let db = undefined;

async function init(){
    if(!db){
        db = new Database(config.database.sqlite.path, { create: true });
        db.query("CREATE TABLE IF NOT EXISTS users(id text, username text, hashpass text, email text)").run();
        db.query("CREATE TABLE IF NOT EXISTS token (id text, token text, created_at text)").run()
    }
}

function sqlite_escape(value:string) {
    return value.replace(/'/g, "''");
}

// id and token
// TODO トークンに有効期限, adminのトークン
function create_token(id: string) {
    // q = string(true) or undefined(false)
    const q = db.query(`SELECT * FROM token WHERE id = '${sqlite_escape(id)}'`).all()[0];
    const token:string = Bun.randomUUIDv7();
    const created_at:string = date.now();
    if(q) {
        db.query(`UPDATE token SET token = '${token}',  created_at = '${created_at}' WHERE id = '${sqlite_escape(id)}'`).run();
    } else {
        db.query(`INSERT INTO token(id, token, created_at) VALUES ('${sqlite_escape(id)}', '${token}', '${created_at}')`).run();
    }
    return token;
}

async function add_user(username:string, hashpass:string, email:string) {
    const q = db.query(`SELECT * FROM users WHERE username = '${sqlite_escape(username)}' OR email = '${sqlite_escape(email)}'`).all()[0];
    if(q) {
        return false;
    } else {
        db.query(`INSERT INTO users (id, username, hashpass, email) VALUES('${Bun.randomUUIDv7()}', '${sqlite_escape(username)}', '${sqlite_escape(hashpass)}', '${sqlite_escape(email)}')`).run();
        return true;
    }
}


async function login(username:string, password:string) {
    const q = db.query(`SELECT * FROM users WHERE username = '${sqlite_escape(username)}'`).all()[0];
    const p:boolean = await Bun.password.verify(password, q.hashpass);
    if(!q || !p) {
        return false
    } else {
    const id:string =  q.id;
    return create_token(id);
    //return = token(true) or false
    }
}

// admin token
//uuidが奇跡的に被ったらどうなる？ => TODO 重複対策
async function auth_token(token: string) {
    const q = db.query(`SELECT * FROM token WHERE token = '${sqlite_escape(token)}'`).all()[0];
    if(!q) {
        return false;
    } else {
        return true;
    }
}


export default {init, add_user, login, auth_token}