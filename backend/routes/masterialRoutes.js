import express from 'express';
import { addMaterial, getAllData, getGlobalSearch, getProductCompany, getSingleMaterial, getUploadSearch } from '../controllers/materialController.js';

const router = express.Router();
router.get("/getall", getAllData)
router.get("/getglobalsearch/:search", getGlobalSearch)
router.get("/getuploadsearch/:value", getUploadSearch)
router.get("/getsinglematerial/:material", getSingleMaterial)
router.post("/addMaterial", addMaterial)
router.get("/:company/getAllProducts", getProductCompany)

export default router