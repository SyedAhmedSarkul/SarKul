import crypto from "crypto";

export const generateCallId = () => {
    return crypto.randomBytes(3).toString("hex");
};

export const generateEngineerId = () => {
    const randomBytes = crypto.randomBytes(3);
    return parseInt(randomBytes.toString("hex"), 16) % 1000000;
};