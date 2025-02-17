export async function escape(value:string) {
    return value.replace(/'/g, "''");
}