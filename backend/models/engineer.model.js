import mongoose, {Schema} from "mongoose";

const engineerSchema = new Schema({
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
        minLength: [10, "Employee contact must be 11 digits"],
        maxLength: [14, "Employee contact must be 11 digits"],
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
        type: String
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"],
    }
}, {timestamps: true});

export const Engineer = mongoose.model("Engineer", engineerSchema);