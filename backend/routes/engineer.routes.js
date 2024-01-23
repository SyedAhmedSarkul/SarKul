import express from "express";
import {createEngineer, getEngineer, getAllEngineers, updateEngineer} from "../controllers/engineer.controller.js";
import {createEngineerValidation, getEngineerValidation, updateEngineerValidation} from "../middlewares/engineer.middleware.js";

const router = express.Router();

router.post("/", createEngineerValidation, createEngineer);
router.get("/", getAllEngineers);
router.get("/:employeeCode", getEngineerValidation, getEngineer);
router.patch("/:employeeCode", updateEngineerValidation, updateEngineer);

export default router;