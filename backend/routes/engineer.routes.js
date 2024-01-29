import express from "express";
import {createEngineer, getEngineer, getAllEngineers, updateEngineer} from "../controllers/engineer.controller.js";
import {createEngineerValidation, getEngineerValidation, updateEngineerValidation} from "../middlewares/engineer.middleware.js";
import {verifyToken} from "../middlewares/auth.middlewares.js";
import {upload} from "../middlewares/multer.js";

const router = express.Router();

router.post("/", verifyToken, upload.fields([{name: "idProof", maxCount: 1}, {name: "certificate", maxCount: 1}]), createEngineerValidation, createEngineer);
router.get("/", verifyToken, getAllEngineers);
router.get("/:employeeCode", verifyToken, getEngineerValidation, getEngineer);
router.patch("/:employeeCode", verifyToken, updateEngineerValidation, updateEngineer);

export default router;