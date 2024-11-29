function hash_password (password: string) {
    const hash: string = Bun.password.hashSync(password);
    return hash
}

export default {hash_password}
