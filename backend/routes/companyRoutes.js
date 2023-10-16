import express from 'express';
import { addCompany, addCompanyEntity } from '../controllers/companyController.js';

const router = express.Router();

router.post("/addcompany", addCompany)
router.post("/addCompanyEntity/:name", addCompanyEntity)
export default router