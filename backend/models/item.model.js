import mongoose, {Schema} from "mongoose";

const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, "Item name is required"],
    },
    modelNumber: {
        type: String,
        required: [true, "Model number is required"],
    }
}, {timestamps: true});

export const Item = mongoose.model("Item", itemSchema);