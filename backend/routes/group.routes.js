import express from "express";
// import {addMyStocks, getMyStocks} from "../controllers/mystocks.controller.js";
import {isAdmin, verifyToken} from "../middlewares/auth.middlewares.js";
import { addGroup, getGroup } from "../controllers/group.controller.js";

const router = express.Router();

// router.get("/", verifyToken, isAdmin, getMyStocks);
// router.post("/", verifyToken, isAdmin, addMyStocks);
router.get("/", verifyToken, isAdmin, getGroup);
router.post("/", verifyToken, isAdmin, addGroup);

export default router;