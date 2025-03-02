import { Database } from "bun:sqlite"
import { db } from "./init"
import { escape } from "./utils/sqlite"

export async function root(client_name:string, redirect_uris:string, scopes:string, website:string){
    
}