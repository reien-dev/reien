async function hash_password (password: string) {
    const hash: string = await Bun.password.hash(password);
    return hash
}

console.log(await hash_password("114514"))

export default {hash_password}