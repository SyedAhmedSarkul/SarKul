import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        default: "cheemstech01@gmail.com"
    },
    otp: {
        type: Number,
        maxLength: [6, "OTP must be 6 digits"],
    }
});

export const User = mongoose.model("User", userSchema);