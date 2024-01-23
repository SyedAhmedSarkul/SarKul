import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        default: "cheemstech01@gmail.com"
    },
    otp: {
        type: String,
    }
});

export const User = mongoose.model("User", userSchema);