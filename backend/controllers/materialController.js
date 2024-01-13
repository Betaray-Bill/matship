import asyncHandler from "express-async-handler"
import masterClass from "../models/materialsModel.js"
import { Company, CompanyEntity } from "../models/companyEntity.js";


// get Single Product - GET - /getsingleproduct - Search Materials DB
const getSingleMaterial = asyncHandler(async(req, res) => {
    const query = req.params.material;
    // console.log(query)
    try{
        const getMaterial = await masterClass.findOne({
            productName:query
        })
        // console.log(getMaterial)
        res.status(200).json({getMaterial})
    }catch(error){
        console.error(error);
        return res.status(500).json({ error: 'Error fetching the product' });
    }
})

// add Material - POST - /addmaterials - to Company Entity
const addMaterial = asyncHandler(async(req, res) => {
    const { 
        isLegacy, MasterClass, subClass, 
        Family, companyEntity , Sustainability,
        Filler, DeliveryForm, productName, company, 
        L0, h, CrossHeadSpeed, NumberOf_Specimens, 
        x_axis, y_axis, conditioned,
        temp,dataSetValue
    } = req.body;
    console.log(req.body)
    const companyEntityExists = await CompanyEntity.findOne({name:companyEntity})

    if(!companyEntityExists){
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
        DeliveryForm,
        L0, 
        h, 
        CrossHeadSpeed, 
        NumberOf_Specimens, 
        X_axis_Type:x_axis, 
        Y_axis_Type:y_axis, 
        conditioned, 
        temperature:temp,
        // dataSetValue
    })
    await product.save();

    try{
        // console.log(productName, companyEntityExists)
        if(isLegacy){
            if(companyEntityExists.Legacymaterials.includes(productName)){
                return res.json({
                    error:"Material already exits"
                })
            }
            await companyEntityExists.Legacymaterials.push(productName);
            await companyEntityExists.save()
        }else{
            // check if the material already exists in Db;
            await companyEntityExists.Properitarymaterials.push(productName);
            await companyEntityExists.save()
        }
    
        return res.status(200).json(product)
    }catch(err){
        console.error(error);
        return res.status(500).json({ error: 'Error adding the materials to Company' });
    }
})

// Update Single Material Material
const updateMaterial = asyncHandler(async(req, res) => {
    const material = await masterClass.findById(req.params.id);
    const Entity = await CompanyEntity.find({
        name:req.params.companyEntity
    });

    console.log("Material", material, Entity)
    if(!material && !Entity){
        res.status(400)
        throw new Error("Material not found")
    }
    const updatedMaterial = await masterClass.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMaterial)
})

// get data from a single company - GET - /:companyEntity/getAllProducts
const getProductCompany = asyncHandler(async(req, res) => {
    // console.log(req.params.company);
    const companyExists = await CompanyEntity.findOne({name:req.params.company});
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
    // console.log("meoowssss")
    const result = await masterClass.find({})
    // console.log(result)
    res.status(200).json(result)
})

//Get result from global search
const getGlobalSearch =asyncHandler( async(req, res) => {
    const search = req.body
    console.log(req.params)
    const s = req.params.search.split(' ')
    console.log(s)
    const ans = await masterClass.aggregate([
        {
            $search: {
            index: "masterclasses",
            text: {
                query: s.join(' '),
                path: {
                    wildcard: "*"
                    }
                }
            }
        },
    ])
    console.log("SNSSSSSSSSSSS",ans)

    res.status(200).json(ans)
})




// Get Result from the Upload Section Search - Return Suggestions and Result

const getUploadSearch = asyncHandler(async(req, res) => {
    // const query = req.params.value;
    console.log("req.query.value", req.params.value)

    const ans = await masterClass.aggregate([
        {
            $search: {
            index: "masterclasses",
            text: {
                    query: req.params.value,
                    path: {
                            wildcard: "*"
                        },
                }
            }
        }
    ])

    const suggestions  = await Array.from(ans).map((e) => e.name)

    res.status(200).json({
        ans, suggestions
    })

})


export { getGlobalSearch, getAllData, addMaterial, getProductCompany, getUploadSearch, getSingleMaterial,updateMaterial}

