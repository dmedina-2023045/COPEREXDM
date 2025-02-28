import { Router } from "express";
import { addCompany, getCompanies, updateCompany} from "./company.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { addCompanyValidator ,updateCompanyValidator} from "../../middlewares/validator.js";

const api = Router()

api.post('/addCompany', [validateJwt , addCompanyValidator], addCompany)
api.get('/getCompanies', validateJwt , getCompanies)
api.put('/updateCompany/:id', [validateJwt, updateCompanyValidator], updateCompany)

export default api