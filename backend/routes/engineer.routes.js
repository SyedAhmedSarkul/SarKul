import express from "express";
import {createEngineer, getEngineer, getAllEngineers, updateEngineer} from "../controllers/engineer.controller.js";
import {createEngineerValidation, getEngineerValidation, updateEngineerValidation} from "../middlewares/engineer.middleware.js";
import {verifyToken} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/", verifyToken, createEngineerValidation, createEngineer);
router.get("/", verifyToken, getAllEngineers);
router.get("/:employeeCode", verifyToken, getEngineerValidation, getEngineer);
router.patch("/:employeeCode", verifyToken, updateEngineerValidation, updateEngineer);

export default router;