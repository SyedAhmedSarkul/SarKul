import express from "express";
import {
    createTransaction,
    getTransaction,
    getTransactions,
} from "../controllers/tranaction.controller.js";
import {
    createTransactionMiddleware,
    getTransactionMiddleware,
} from "../middlewares/transaction.middlewares.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router
    .route("/")
    .post(verifyToken, isAdmin, createTransactionMiddleware, createTransaction)
    .get(verifyToken, isAdmin, getTransactions);
router
    .route("/:callId")
    .get(verifyToken, isAdmin, getTransactionMiddleware, getTransaction);

export default router;
