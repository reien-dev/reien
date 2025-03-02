import { Hono } from "hono"

export const apps = new Hono()

apps.post("/", async(c) => {
    try{
        const body = await c.req.json();
        
        c.status(200)

    } catch(e) {
        c.status(422)
        return c.json({
            "error": "Validation failed: Redirect URI must be an absolute URI."
        }) 
    }
})

apps.get("/verify_credentials", async(c) => {
    try {
        c.status(200)
    } catch(e) {
        c.status(401)
        return c.json({
            "error": "The access token is invalid"
        })
    }
})
