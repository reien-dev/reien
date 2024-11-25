import { Database } from "bun:sqlite"
import config from "./../../config.toml"
import date from "./../../utils/date"

let db = undefined;

async function init(){
    if(!db){
        db = new Database(config.database.sqlite.path, { create: true });
        db.query("CREATE TABLE IF NOT EXISTS users(username text, hash text, email text)").run();
        db.query("CREATE TABLE IF NOT EXISTS token (username text, token text, created_at text)").run()
    }
}

function sqlite_escape(value:string) {
    return value.replace(/'/g, "''");
}


// TODO ユーザ固有のIDを追加する。(ユーザネームの変更などができなくなるため)

async function add_user(username:string, hashpass:string, email:string) {
    let q = db.query(`SELECT * FROM users WHERE username = '${sqlite_escape(username)}' OR email = '${sqlite_escape(email)}'`).all()[0];
    if(q) return false;
    db.query(`INSERT INTO users VALUES('${sqlite_escape(username)}', '${sqlite_escape(hashpass)}', '${sqlite_escape(email)}')`).run();
    return true;
}

async function login(username:string, password:string) {
    let q = db.query(`SELECT * FROM users WHERE username = '${sqlite_escape(username)}'`).all()[0];
    if(!q) return false;
    const auth:boolean = await Bun.password.verify(password, q.hash);
    const token:string = create_token(username)
    return [auth, token];
}

// TODO トークンを定期的に削除する(有効期限)

function create_token(username: string) {
    let q = db.query(`SELECT * FROM token WHERE username = '${sqlite_escape(username)}'`).all()[0];
    // q = string(true) or undefined(false)
    const token:string = Bun.randomUUIDv7();
    const created_at:string = date.now();
    if(q) {
        db.query(`UPDATE token SET token = '${token}',  created_at = '${created_at}' WHERE username = '${sqlite_escape(username)}'`).run();
    } else {
        db.query(`INSERT INTO token(username, token, created_at) VALUES ('${sqlite_escape(username)}', '${token}', '${created_at}')`).run();
    }
    return token;
}

async function auth_token() {

}


export default {init, add_user, login}