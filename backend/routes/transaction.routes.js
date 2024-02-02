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
import { verifyToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router
    .route("/")
    .post(verifyToken, createTransactionMiddleware, createTransaction)
    .get(verifyToken, getTransactions);
router
    .route("/:callId")
    .get(verifyToken, getTransactionMiddleware, getTransaction);

export default router;
