import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 
import authRoutes from '../src/auth/auth.routes.js'
import companyRoutes from '../src/company/company.routes.js'
import reportRoutes from '../src/report/report.routes.js'

import {limiter} from '../middlewares/rate.limits.js'

const configs = (app)=>{
    app.use(express.json()) 
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter) 
}

const routes = (app)=>{ 
    app.use(authRoutes)
    app.use(companyRoutes)
    app.use(reportRoutes)

}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(e){
        console.error('Server init failed', e)
    }
}