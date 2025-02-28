import Company from '../src/company/company.model.js'
import Client from '../src/clients/client.model.js'

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}

export const existName = async(name, company)=>{
    const alreadyCompany = await Company.findOne({name:name})
    if(alreadyCompany && alreadyCompany._id != company._id){
        console.error(`Name ${name} is already taken`)
        throw new Error(`Name ${name} is already taken`)
    }
}

export const existEmail = async(email, company)=>{
    const alreadyEmail = await Company.findOne({email:email}) 
        if(alreadyEmail && alreadyEmail._id != company._id){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existAddress = async(address, company)=>{
    const alreadyAddress = await Company.findOne({address:address})
    if(alreadyAddress && alreadyAddress._id != company._id){
        console.error(`Address ${address} is already taken`)
        throw new Error(`Address ${address} is already taken`)
    }
}

export const findClient = async(id)=>{
    try{
        const clientExist = await Client.findById(id)
        if(!clientExist) return false
        return clientExist
    }catch(e){
        console.error(e)
        return false
    }
}