import express from "express";
import {createCall, getAllCalls, getCallById, updateCall, deleteCall, getPendingCalls, getCompletedCalls, assignCallToEngineer, closeCall} from "../controllers/call.controller.js";
import {createCallValidation, callIdValidation, callAssignValidation, callUpdateValidation} from "../middlewares/call.middlewares.js";

const router = express.Router();

router.get("/closed", getCompletedCalls);
router.get("/pending", getPendingCalls);
router.post("/close/:callId", callIdValidation, closeCall);
router.route("/").get(getAllCalls).post(createCallValidation, createCall);
router.route("/:callId").get(callIdValidation, getCallById).patch(callUpdateValidation, updateCall).delete(callIdValidation, deleteCall);
router.post("/assign", callAssignValidation, assignCallToEngineer);

export default router;