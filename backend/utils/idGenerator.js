import crypto from "crypto";

function generateString() {
    return crypto.randomBytes(3).toString("hex");
}

function generateNumber() {
    const randomBytes = crypto.randomBytes(3);
    return parseInt(randomBytes.toString("hex"), 16) % 1000000;
}
export const generateCallId = () => {
    return generateString();
};

export const generateEngineerId = () => {
    return generateNumber();
};