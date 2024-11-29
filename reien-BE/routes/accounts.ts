import { Hono } from "hono";
import database from "./../models/database"
import crypt from "./../utils/crypt"

export const accounts = new Hono();

accounts.post("/signup", async (c) => {
    try {
        const db = await database.init();
        const body = await c.req.json();
        const username:string = body.username;
        const password:string = body.password;
        const email:string = body.email;
        if(await db.signup(username, password, email)){
            c.status(200);
            return c.json({
                message: "Success"
            });
        }else{
            c.status(403);
            return c.json({
                error: "Signup failure"
            });
        }
    } catch(e) {
        c.status(500);
        return c.json({
            error: "Internal server error"
        });
    }
})

accounts.post("/signin", async (c) => {
    try{
        const db = await database.init();
        const body = await c.req.json();
        const username:string = body.username;
        const password:string = body.password;
        const token = await db.signin(username,password)
        // token = uuid(true) or false
        if(token){
            c.status(200);
            return c.json({
                message: "Success",
                token: token
            });
        }else{
            c.status(403);
            return c.json({
                error: "Login failure"
            });
        }
    }catch(e){
        c.status(500);
        return c.json({
            error: "Internal server error"
        });
    }
})


accounts.post("/test", async (c) => {
    try{
        const db = await database.init();
        const auth = c.req.header('Authorization')
        if(await db.auth_token(auth)){
            c.status(200);
            return c.json({
                message: "Success",
            });
        }else{
            c.status(403);
            return c.json({
                error: "403"
            });
        }
    }catch(e){
        c.status(500);
        return c.json({
            error: "500"
        });
    }
})