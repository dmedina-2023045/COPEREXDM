import { Schema, model } from "mongoose";

const companySchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        maxLength: [64, `Can't overcome 64 characters`],
        unique: [true, 'This name is already in use']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'This email is already in use']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        minLength: [8, `Can't be overcome 16 characters`],
        maxLength: [15, 'Phone must be 15 numbers'],
    },
    address:{
        type: String,
        required: [true, 'Address is required'],
        maxLength: [256, `Can't overcome 256 characters`],
        unique: [true, 'your address must be unique'],
        
    },
    yoTrayectory:{
        type: Number,
        required:[true, 'Years of trayectory is required'],
    },
    impactLvl:{
        type:String,
        required:[true, 'Impact level is required'],
    },
    cCategorie:{
        type: String,
        required: [true, 'Categorie is required'],
        
    }
})

export default model('Company', companySchema)