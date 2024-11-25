function now () {
    const now = new Date()
    const iso = now.toISOString()
    return iso
}

export default {now}