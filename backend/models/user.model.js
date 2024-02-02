import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    otp: {
        type: String,
    },
    role: {
        type: String,
        enum: {
            values: ["ADMIN", "USER"],
            message: "{VALUE} is not supported",
        },
        default: "USER",
    },
});

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d",
    });
};

export const User = mongoose.model("User", userSchema);
