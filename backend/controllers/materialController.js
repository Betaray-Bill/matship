import asyncHandler from "express-async-handler"
import masterClass from "../models/materialsModel.js"
import { Company } from "../models/companyEntity.js";


// add Material - POST - /addmaterials
const addMaterial = asyncHandler(async(req, res) => {
    const { isLegacy, MasterClass, subClass, Family, Sustainability, Filler, DeliveryForm, productName, company } = req.body;

    const companyExists = await Company.findOne({name:company})

    if(!companyExists){
        res.status(500);
        throw new Error("No such Compnay Exists")
    }

    const product = await masterClass.create({
        productName,
        MasterClass,
        subClass,
        Family,
        Sustainability,
        Filler,
        DeliveryForm
    })

    await product.save();

    try{
        console.log(productName, companyExists)
        if(isLegacy){
            await companyExists.Legacymaterials.push(productName);
        }else{
            // check if the material already exists in Db;

            

            await companyExists.Properitarymaterials.push(productName);
        }
        console.log("ADDED" ,companyExists);
        await companyExists.save()
        return res.status(200).json(product)
    }catch(err){
        console.error(error);
        return res.status(500).json({ error: 'Error adding the materials to Company' });
    }
})

// get data from a single company - GET - /:company/getAllProducts
const getProductCompany = asyncHandler(async(req, res) => {
    console.log(req.params.company);
    const companyExists = await Company.findOne({name:req.params.company});
    if(!companyExists){
        res.status(500);
        throw new Error("No such Compnay Exists")
    }

    try{
        const prd = await companyExists.Legacymaterials;
        console.log(prd)
        return res.status(200).json(prd)
    }catch(err){
        console.error(error);
        return res.status(500).json({ error: 'Error adding the materials to Company' });
    }

})


// get all data
const getAllData = asyncHandler(async(req, res) => {
    console.log("meoowssss")
    const result = await masterClass.find({})
    console.log(result)
    res.status(200).json(result)
})

//Get result from global search
const getGlobalSearch =asyncHandler( async(req, res) => {
    const search = req.body
    console.log(req.params)
    const ans = await masterClass.aggregate([
        {
            $search: {
            index: "masterclasses",
            text: {
                query: req.params.search,
                path: {
                    wildcard: "*"
                    }
                }
            }
        }
    ])
    console.log(ans)

    res.status(200).json(ans)

})


export { getGlobalSearch, getAllData, addMaterial, getProductCompany}