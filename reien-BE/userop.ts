import { JSONFilePreset } from "lowdb/node"


async function useradd (username, password) {
    const defaultData = {users: []}
    const db = await JSONFilePreset("./database/users.json", defaultData)

    db.data.users.push({"user": username,"pass": password})
    await db.write()
    return "success"
}

export default {useradd}