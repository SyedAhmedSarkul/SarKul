import {ApiResponse} from "../utils/ApiResponse.js";

export const createEngineerValidation = async (req, res, next) => {
    const {employeeName, employeeDOB, employeeAddress, employeeDesignation, employeeContact, joinDate, idProof, qualification, certificate, salary} = req.body;

    if (!employeeName || !employeeDOB || !employeeAddress || !employeeDesignation || !employeeContact || !joinDate || !idProof || !qualification || !certificate || !salary) {
        return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
    }
    next();
};