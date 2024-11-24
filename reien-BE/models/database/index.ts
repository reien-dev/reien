import config from "../../config.toml"

async function init(){
    let db;
    if(config.database.use == "sqlite"){
        db = await import("./sqlite.ts");
    }else{
        throw new Error("No such database module");
    }
    db = db.default;
    await db.init();
    return db;
}

export default {init}