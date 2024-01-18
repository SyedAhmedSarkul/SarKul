import express from "express";
import {createCall, getAllCalls, getCallById, updateCall, deleteCall} from "../controllers/call.controller.js";
const router = express.Router();

router.route("/").post(createCall).get(getAllCalls);
router.route("/:id").get(getCallById).patch(updateCall).delete(deleteCall);

export default router;