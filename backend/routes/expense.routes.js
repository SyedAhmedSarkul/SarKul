import express from "express";
import {isAdmin, verifyToken} from "../middlewares/auth.middlewares.js";
import { addExpense, getExpense } from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getExpense);
router.post("/", verifyToken, isAdmin, addExpense);

export default router;