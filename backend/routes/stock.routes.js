import express from "express";
import {createStockValidation, deleteStockValidation, updateStockValidation, getStockValidation} from "../middlewares/stock.middlewares.js";
import {createStock, getAllStocks, deleteStock, updateStock, getStock} from "../controllers/stock.controller.js";
import {verifyToken} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/").post(verifyToken, createStockValidation, createStock).get(verifyToken, getAllStocks);
router.route("/:stockId").get(verifyToken, getStockValidation, getStock).patch(verifyToken, updateStockValidation, updateStock).delete(verifyToken, deleteStockValidation, deleteStock);

export default router;