import { Hono } from 'hono'
import { oauth } from './oauth'

export const api = new Hono();

api.route("/oauth", oauth);


