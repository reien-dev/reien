import { Hono } from "hono"
import { oauth } from "./oauth"
import { apps } from "./apps"

export const api = new Hono();

api.route("/oauth", oauth);
api.route("/api/v1/apps", apps);

