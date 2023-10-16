import asyncHandler from "express-async-handler"
import masterClass from "../models/materialsModel.js"


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
            index: "search-text",
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


export { getGlobalSearch, getAllData}