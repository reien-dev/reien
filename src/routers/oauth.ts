import { Hono } from 'hono'

export const oauth = new Hono()

oauth.get("/", async (c) => {
    try {
        c.status(200);
        return c.json({
            message: "Success"
        });
    } catch(e) {
        c.status(500);
        return c.json({
            error: "Internal server error"
        });
    }
})
