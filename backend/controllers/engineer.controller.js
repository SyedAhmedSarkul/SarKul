import {Engineer} from "../models/engineer.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {generateEngineerId} from "../utils/idGenerator.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

const createFilter = (query) => {
    let filter = {};
    let sort = {};
    if (query.employeeName) {
        filter.employeeName = {$regex: query.employeeName, $options: "i"};
    }
    if (query.employeeCode) {
        filter.employeeCode = parseInt(query.employeeCode);
    }
    if (query.employeeDesignation) {
        filter.employeeDesignation = {$regex: query.employeeDesignation, $options: "i"};
    }
    if (query.status) {
        filter.status = query.status;
    }
    if (query.resignedAt) {
        filter.resignedAt = {
            $gte: new Date(new Date(query.resignedAt).setUTCHours(0, 0, 0, 0)),
            $lt: new Date(new Date(query.resignedAt).setUTCHours(23, 59, 59, 999))
        };
    }

    if (query.salary) {
        filter.salary = parseInt(query.salary);
    }

    if (query.sort) {
        let sortBy = query.sort.split(",");
        sortBy.map((item) => {
            if (item[0] === '-') {
                sort[item.slice(1)] = -1;
            }
            else {
                sort[item] = 1;
            }
        });
        // console.log(sort);
    }

    if (query.joinDate) {
        filter.joinDate = {
            $gte: new Date(new Date(query.joinDate).setUTCHours(0, 0, 0, 0)),
            $lt: new Date(new Date(query.joinDate).setUTCHours(23, 59, 59, 999))
        };
    }
    if (query.employeeDOB) {
        filter.employeeDOB = {
            $gte: new Date(new Date(query.employeeDOB).setUTCHours(0, 0, 0, 0)),
            $lt: new Date(new Date(query.employeeDOB).setUTCHours(23, 59, 59, 999))
        };
    }
    return {filter, sort};
};

export const createEngineer = async (req, res) => {
    try {
        const {employeeName, employeeDOB, employeeAddress, employeeDesignation, employeeContact, joinDate, qualification, reference, salary} = req.body;
        if (employeeDOB > joinDate) {
            throw new ApiError(400, "Employee DOB cannot be greater than Join date");
        }
        const idProofLocalPath = req.files?.idProof?.[0]?.path;
        const certificateLocalPath = req.files?.certificate?.[0]?.path;

        if (!idProofLocalPath) {
            throw new ApiError(400, "Id Proof is required");
        }
        if (!certificateLocalPath) {
            throw new ApiError(400, "Qualification is required");
        }
        const idProofUrl = await uploadOnCloudinary(idProofLocalPath);
        const certificateUrl = await uploadOnCloudinary(certificateLocalPath);
        if (!idProofUrl) {
            throw new ApiError(500, "Failed to upload id proof");
        }
        if (!certificateUrl) {
            throw new ApiError(500, "Failed to upload qualification");
        }
        // console.log(idProofUrl, certificateUrl);
        const engineer = await Engineer.create({
            employeeName,
            employeeDOB,
            employeeAddress,
            employeeDesignation,
            employeeContact,
            joinDate,
            qualification,
            reference,
            salary,
            idProof: idProofUrl,
            certificate: certificateUrl
        });
        if (!engineer) {
            throw new ApiError(500, "Failed to create engineer");
        }
        engineer.employeeCode = generateEngineerId();
        await engineer.save();
        return res.status(200).json(new ApiResponse(201, engineer, "Engineer created successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while creating engineer"));
    }
};

export const updateEngineer = async (req, res) => {
    try {
        const {status, resignedAt, incrementDueDate, remarks} = req.body;
        const engineer = await Engineer.findOne({employeeCode: req.params.employeeCode});
        if (!engineer) {
            throw new ApiError(404, "Engineer not found");
        }
        if (resignedAt) {
            if (engineer.joinDate > resignedAt) {
                throw new ApiError(400, "Engineer cannot be resigned before joining. Please check join date and resigned date");
            }
            engineer.resignedAt = resignedAt;
        }
        if (status) {
            engineer.status = status;
        }
        if (incrementDueDate) {
            engineer.incrementDueDate = incrementDueDate;
        }
        if (remarks) {
            engineer.remarks = remarks;
        }
        await engineer.save();
        return res.status(200).json(new ApiResponse(200, engineer, "Engineer updated successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while updating engineer"));
    }
};

export const getEngineer = async (req, res) => {
    try {
        const engineer = await Engineer.findOne({employeeCode: req.params.employeeCode});
        if (!engineer) {
            throw new ApiError(404, "Engineer not found");
        }
        return res.status(200).json(new ApiResponse(200, engineer, "Engineer retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving engineer"));
    }
};

export const getAllEngineers = async (req, res) => {
    try {
        const {filter, sort} = createFilter(req.query);
        if (Object.keys(sort).length === 0) {
            sort.createdAt = -1;
        }
        const engineers = await Engineer.aggregate([
            {
                $match: filter
            },
            {
                $sort: sort
            }
        ]);
        return res.status(200).json(new ApiResponse(200, engineers, "Engineers retrieved successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode, null, error.message || "Something went wrong while retrieving engineers"));
    }
};