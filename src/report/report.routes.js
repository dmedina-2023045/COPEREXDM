import {Router} from 'express';
import {generateReport} from './report.controller.js';
import {validateJwt} from '../../middlewares/validate.jwt.js'

const api = Router();

api.get('/getReport', validateJwt, generateReport);

export default api;