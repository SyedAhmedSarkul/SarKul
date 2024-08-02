import mongoose, { Schema } from "mongoose";
import validator from "validator";

const groupSchema = new Schema(
    {
        groupName: {
            type: String,
            // required: [true, "Employee name is required"],
        },

    },
    { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);
