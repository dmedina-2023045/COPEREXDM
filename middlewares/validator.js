import {body} from "express-validator"
import {validateErrorsWithoutFiles, validateErrors} from './validate.errors.js'
import {existAddress, existName, existEmail} from "../utils/db.validator.js"

export const addCompanyValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existName),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .toLowerCase()
        .custom(existEmail),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    body('address', 'Address cannot be empty')
    .notEmpty()
    .toLowerCase()
    .custom(existAddress),
    body('cCategorie','Address cannot be empty').notEmpty().toLowerCase(),
    validateErrors

]

export const updateCompanyValidator = [
    body('name', 'This name is already in use').optional().notEmpty().custom(existName).toLowerCase(),
    body('email', 'This email is already in use').optional().notEmpty().isEmail().custom((existEmail, {req})=>existEmail(email, req.Company)).toLowerCase(),
    body('address', 'Address cannot be empty').optional().notEmpty().custom(existAddress).toLowerCase(),
    body('cCategorie','Address cannot be empty').optional().notEmpty().toUpperCase(),
    validateErrorsWithoutFiles
]   