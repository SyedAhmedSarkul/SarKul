import mongoose, {Schema} from "mongoose";

const transactionSchema = new Schema({
    category: {
        type: String,
        enum: {
            values: ["e2b", "b2e"],
            message: "{VALUE} is not supported",
        },
        default: "b2e"
    },
    callId: {
        type: String,
        required: [true, "Call ID is required"],
    },
    itemName: {
        type: String,
        required: [true, "Item name is required"],
        enum: {
            values: ["printer", "scanner", "desktop", "laptop", "plotter", "server"],
            message: "{VALUE} is not supported",
        }
    },
    modelNumber: {
        type: String,
        required: [true, "Model number is required"],
    },
    stockId: {
        type: String,
        required: [true, "Stock id is required"],
    },
    engineerName: {
        type: String,
        required: [true, "Engineer name is required"],
    },
    serialNumber: {
        type: String,
    },
    partStatus: {
        type: String,
        enum: {
            values: ["working", "faulty", "damaged"],
            message: "{VALUE} is not supported",
        }
    }
}, {timestamps: true});

export const Transaction = mongoose.model("Transaction", transactionSchema);