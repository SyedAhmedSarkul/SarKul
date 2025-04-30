import mongoose, { Schema } from "mongoose";
import validator from "validator";

const engineerSchema = new Schema(
    {
        employeeName: {
            type: String,
            required: [true, "Employee name is required"],
        },
        employeeCode: {
            type: Number,
            unique: [true, "Employee code must be unique"],
        },
        employeeDOB: {
            type: Date,
            required: [true, "Employee DOB is required"],
        },
        employeeAddress: {
            type: String,
            required: [true, "Employee address is required"],
        },
        employeeDesignation: {
            type: String,
            required: [true, "Employee designation is required"],
        },
        employeeContact: {
            type: String,
            required: [true, "Employee contact is required"],
            validate: [validator.isMobilePhone, "Invalid mobile number"],
        },
        employeeEmail: {
            type: String,
            required: [true, "Employee email is required"],
            validate: [validator.isEmail, "Invalid email"],
        },
        joinDate: {
            type: Date,
            required: [true, "Join date is required"],
        },
        idProof: {
            type: String,
            required: [true, "Id proof is required"],
        },
        qualification: {
            type: String,
            required: [true, "Qualification is required"],
        },
        certificate: {
            type: String,
            required: [true, "Certificate is required"],
        },
        reference: {
            type: String,
        },
        salary: {
            type: Number,
            required: [true, "Salary is required"],
        },
        status: {
            type: String,
            enum: {
                values: ["active", "inactive", "resigned"],
                message: "{VALUE} is not supported",
            },
            default: "active",
        },
        resignedAt: {
            type: Date,
        },
        incrementDueDate: {
            type: Date,
        },
        revisedSalary: {
            type: String,
        },
        revisedDesignation: {
            type: String,
        },
        increementAmount: {
            type: String,
        },
        remarks: {
            type: String,
        },
        assignedTo: [
            {
                type: String,
            },
        ],
        experience: {
            type: String,
        },
        skills: [String],
    },
    { timestamps: true }
);

export const Engineer = mongoose.model("Engineer", engineerSchema);
