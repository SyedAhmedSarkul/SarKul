import express from "express";
import {createEngineer} from "../controllers/engineer.controller.js";
import {createEngineerValidation} from "../middlewares/engineer.middleware.js";

const router = express.Router();

router.post("/", createEngineerValidation, createEngineer);

export default router;