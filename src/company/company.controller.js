import Company from './company.model.js'


export const addCompany = async(req, res)=>{
    try{    
        let data = req.body
        let company = new Company(data)
        await company.save()
        return res.send({success: true, message: `Company added succesfully`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getCompanies = async (req, res) => {
    try {
        const {categorie, minYears, maxYears, sort} = req.query;
        const filters = {};
        if (Company.length == 0) return res.status(404).send(
            {success: false, message: 'Companies not found'}
        )
        if (categorie) filters.cCategorie = categorie;
        if (minYears || maxYears) {
            filters.yoTrayectory = {};
            if (minYears) filters.yoTrayectory.$gte = parseInt(minYears);
            if (maxYears) filters.yoTrayectory.$lte = parseInt(maxYears);
        }        
        const sortOptions = {};
        if (sort === 'name_a') sortOptions.name = 1
        if (sort === 'name_z') sortOptions.name = -1
        if (sort === 'years_a') sortOptions.yoTrayectory = 1
        if (sort === 'years_z') sortOptions.yoTrayectory = -1;
        const companies = await Company.find(filters).sort(sortOptions)
        return res.send({success: true, message:'Companies found', companies})
    } catch (e) {
        res.status(500).send({message: 'General error',e })
    }
};

export const updateCompany = async(req, res)=>{
    try{
        const {id} = req.params
        const data = req.body
        const update = await Company.findByIdAndUpdate(id, data, {new: true})
        if(!update) return res.status(404).send(
            {
                success: false, message: 'User not found'
            }
        )
        return res.send({success: true, message: 'Company updated', update})
    }catch(e){
        console.error('General error', e)
        return res.status(500).send({success: false, message: 'General error', e})
    }
}