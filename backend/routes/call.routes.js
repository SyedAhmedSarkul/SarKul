import express from "express";
import {createCall, getAllCalls, getCallById, updateCall, deleteCall, getPendingCalls, getCompletedCalls} from "../controllers/call.controller.js";
import {createCallValidation, callIdValidation} from "../middlewares/call.middlewares.js";

const router = express.Router();

router.get("/closed", getCompletedCalls);
router.get("/pending", getPendingCalls);
router.route("/").post(createCallValidation, createCall).get(getAllCalls);
router.route("/:callId").get(callIdValidation, getCallById).patch(callIdValidation, updateCall).delete(callIdValidation, deleteCall);

export default router;