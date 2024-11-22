async function now () {
    const now = new Date()
    const iso8601 = now.toISOString()
    return iso8601
}



export default{now}