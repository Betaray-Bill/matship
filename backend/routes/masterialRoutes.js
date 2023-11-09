import express from 'express';
import { addMaterial, getAllData, getGlobalSearch, getProductCompany, getSingleMaterial, getUploadSearch, updateMaterial } from '../controllers/materialController.js';

const router = express.Router();
router.get("/getall", getAllData)
router.get("/getglobalsearch/:search", getGlobalSearch)
router.get("/getuploadsearch/:value", getUploadSearch)
router.get("/getsinglematerial/:material", getSingleMaterial)
router.post("/addMaterial", addMaterial)
router.get("/:company/getAllProducts", getProductCompany)
router.put("/:companyEntity/updateMaterial/:id", updateMaterial)

export default router