import { Schema, model } from "mongoose";

const clientSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
            uppercase: true
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
            uppercase: true
        },
        username: {
            type: String,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters']
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8, `Can't be overcome 16 characters`],
            maxLength: [15, 'Phone must be 15 numbers'],
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN', 'CLIENT']
        }
    }
)

export default model('Client', clientSchema)