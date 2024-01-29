import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    email: {
        type: String,
        default: "cheemstech01@gmail.com"
    },
    otp: {
        type: String,
    }
});

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({_id: this._id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d"
    });
};

export const User = mongoose.model("User", userSchema);