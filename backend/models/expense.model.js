import mongoose, { Schema } from "mongoose";
import validator from "validator";

const expenseSchema = new Schema(
    {
        engineerName: {
            type: String,
            // required: [true, "Employee name is required"],
        },
        category:{
            type: String,
        },
        month:{
            type: String,
        },
        period:{
            type: String,
        },
        amount:{
            type: String,
        },
        remarks:{
            type: String,
        },

    },
    { timestamps: true }
);

export const Expense = mongoose.model("Expense", expenseSchema);
