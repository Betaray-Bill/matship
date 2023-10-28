import asyncHandler from "express-async-handler";
import { Company, CompanyEntity } from "../models/companyEntity.js";

// Add Company Details - POST
const addCompany = asyncHandler(async(req, res) => {
    console.log("Add Company")
    try {
        const { name, entities } = req.body; // Assuming you provide the company name and entities in the request body
        const com = await Company.findOne({name:name})
        if(com){
            for(let i=0; i<entities.length; i++){
                com.entities.push(entities[i])
            }
            const savedCompany = await com.save();
            return res.status(200).json(savedCompany);
        }else{
            // saving Company
            const newCompany = new Company({
                name,
                entities,
            });  
            const savedCompany = await newCompany.save();

            // Adding entity's in seperate Collection while creating the company collection
            for(let i=0; i<entities.length; i++){
                const companyEntity = new CompanyEntity({
                    name:entities[i]
                })
                companyEntity.save()
            }

            return res.status(200).json(savedCompany);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error adding the company.' });
    }
})

// Add Company Entity - POST
// const addCompanyEntity
const addCompanyEntity = asyncHandler(async(req, res) => {
    console.log("object")
    // const companyName = req.params.name;
    const { name, CompanyName } = req.body; 
    // console.log(companyName, name)

    try{
        // Add to Company Collection
        const company = await Company.findOne({name:CompanyName});
        console.log(company)
        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }
        company.entities.push(name)
        await company.save()

        // Add Entity details to Company
        const companyEntity = new CompanyEntity({
            name:name
        })

        await companyEntity.save()
        return res.status(200).json(companyEntity);
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error adding the company Entity.' });
    }
})


export {addCompany, addCompanyEntity}