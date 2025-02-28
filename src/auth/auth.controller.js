import Client from '../../src/clients/client.model.js'
import {generateJwt} from '../../utils/jwt.js'
import {encrypt, checkPassword} from '../../utils/encrypt.js'

export const test = (req, res)=>{
    console.log('Test is running')
    res.send({success: true, message: 'Test is running'})
}

const addAdmin = async () => {
    try {
        const defaultAdmin = await Client.findOne({role: 'ADMIN'})
    if (!defaultAdmin) {
             const usuarioAdmin = new Client({
                name: 'Diego',
                surname: 'Medina',
                username: `${process.env.ADMIN_USER}`,
                password: await encrypt(`${process.env.ADMIN_PASSWORD}`),
                phone: '45910878',
                role: "ADMIN"
            })
            await usuarioAdmin.save();
            console.log('Default administrator added succesfully')
        }
    } catch (e) {
        console.error("Error adding a default administrator", e);
    }
};
 
addAdmin();

export const login = async(req, res)=>{
    try{
        let { username, password } = req.body
        let client = await Client.findOne({username: username}) 
        console.log(client)
        if(client && await checkPassword(client.password, password)){
            let loggedUser = {
                uid: client._id,
                username: client.username,
                name: client.name,
                role: client.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${client.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error with login function', e})
    }
}