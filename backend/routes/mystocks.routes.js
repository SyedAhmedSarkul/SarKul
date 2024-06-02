import express from "express";
import {addMyStocks, getMyStocks} from "../controllers/mystocks.controller.js";
import {isAdmin, verifyToken} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getMyStocks);
router.post("/", verifyToken, isAdmin, addMyStocks);

export default router;