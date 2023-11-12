import express from 'express';
import { login, register, signout, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post("/login", login)
router.post("/register", register)
router.get('/signout', signout);
router.put("/update/:id", updateUser);

export default router