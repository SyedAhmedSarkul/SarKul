import express from "express";
import {createTransaction, getTransaction, getTransactions} from "../controllers/tranaction.controller.js";
import {createTransactionMiddleware, getTransactionMiddleware} from "../middlewares/transaction.middlewares.js";

const router = express.Router();

router.route("/").post(createTransactionMiddleware, createTransaction).get(getTransactions);
router.route("/:callId").get(getTransactionMiddleware, getTransaction);

export default router;
