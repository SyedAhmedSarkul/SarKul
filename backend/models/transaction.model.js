import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        category: {
            type: String,
            enum: {
                values: ["e2b", "b2e"],
                message: "{VALUE} is not supported",
            },
            default: "b2e",
        },
        callId: {
            type: String,
            required: [true, "Call ID is required"],
        },
        itemName: {
            type: String,
            enum: {
                values: [
                    "printer",
                    "scanner",
                    "desktop",
                    "laptop",
                    "plotter",
                    "server",
                    "activity",
                ],
                message: "{VALUE} is not supported",
            },
        },
        modelNumber: {
            type: String,
        },
        stockId: {
            type: String,
        },
        engineerName: {
            type: String,
            required: [true, "Engineer name is required"],
        },
        serialNumber: {
            type: String,
        },
        partName: {
            type: String,
        },
        partStatus: {
            type: String,
            enum: {
                values: ["working", "faulty", "damaged"],
                message: "{VALUE} is not supported",
            },
        },
    },
    { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
