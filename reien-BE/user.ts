import { JSONFilePreset } from "lowdb/node"


async function useradd (username, password) {
    const defaultData = {users: []}
    const db = await JSONFilePreset("./database/users.json", defaultData)

    db.data.users.push({"user": username,"pass": password})
    await db.write()
    return "success"
}

async function singup () {

}

async function login () {

}

export default {useradd, singup, login}