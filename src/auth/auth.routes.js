import {Router} from "express";
import {test, login} from "./auth.controller.js";

const api = Router()

api.get('/test', test)
api.post('/login', login)

export default api