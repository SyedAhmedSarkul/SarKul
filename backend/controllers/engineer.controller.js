import {Engineer} from "../models/engineer.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {generateEngineerId} from "../utils/idGenerator.js";

export const createEngineer = async (req, res) => {
    try {
        const {employeeName, employeeDOB, employeeAddress, employeeDesignation, employeeContact, joinDate, idProof, qualification, certificate, reference, salary} = req.body;

        const engineer = await Engineer.create({
            employeeName, employeeDOB, employeeAddress, employeeDesignation, employeeContact, joinDate, idProof, qualification, certificate, reference, salary
        });
        if (!engineer) {
            throw new ApiError(500, "Failed to create engineer");
        }
        engineer.employeeCode = generateEngineerId();
        await engineer.save();
        return res.status(200).json(new ApiResponse(200, engineer, "Engineer created successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while creating engineer"));
    }
};