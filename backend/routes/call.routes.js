import express from "express";
import {createCall, getAllCalls, getCallById, updateCall, deleteCall, getPendingCalls, getCompletedCalls, assignCallToEngineer} from "../controllers/call.controller.js";
import {createCallValidation, callIdValidation, callAssignValidation} from "../middlewares/call.middlewares.js";

const router = express.Router();

router.get("/closed", getCompletedCalls);
router.get("/pending", getPendingCalls);
router.route("/").get(getAllCalls).post(createCallValidation, createCall);
router.route("/:callId").get(callIdValidation, getCallById).patch(callIdValidation, updateCall).delete(callIdValidation, deleteCall);
router.post("/assign", callAssignValidation, assignCallToEngineer);

export default router;