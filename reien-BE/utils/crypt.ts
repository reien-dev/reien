async function hash_password (password: string) {
    const hash: string = await Bun.password.hash(password);
    return hash
}

export default {hash_password}