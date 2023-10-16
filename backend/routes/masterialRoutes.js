import express from 'express';
import { getAllData, getGlobalSearch } from '../controllers/materialController.js';

const router = express.Router();
router.get("/getall", getAllData)
router.get("/getglobalsearch/:search", getGlobalSearch)

export default router