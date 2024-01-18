import mongoose, {Schema} from "mongoose";
import validator from "validator";

const callSchema = new Schema({
    serialNumber: {
        type: String,
        required: [true, "Serial number is required"],
    },
    customerName: {
        type: String,
        required: [true, "Customer name is required"],
    },
    customerCode: {
        type: String,
        required: [true, "Customer code is required"],
    },
    contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
        minLength: [10, "Contact number must be 11 digits"],
        maxLength: [10, "Contact number must be 11 digits"],
    },
    customerEmail: {
        type: String,
        required: [true, "Customer email is required"],
        validate: [validator.isEmail, "Invalid email"],
    },
    customerAddress: {
        type: String,
        required: [true, "Customer address is required"],
    },
    problemDescription: {
        type: String,
        required: [true, "Problem description is required"],
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: {
            values: ["desktop", "laptop", "printer", "plotter", "scanner", "server"],
            message: "Invalid category",
        }
    },
    itemName: {
        type: String,
        required: [true, "Item name is required"],
    },
    itemModelNumber: {
        type: String,
        required: [true, "Item model number is required"],
    }
}, {timestamps: true});

export const Call = mongoose.model("Call", callSchema);