import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import {ApiError} from "./ApiError.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return new ApiError(500, "Couldn't find the file");

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath);
        // console.log(response.url);
        return response.url;
    } catch (error) {
        // console.log(`Error uploading file: ${error}`);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export const deleteFromCloudinary = async (imagePath) => {
    if (!imagePath) return null;
    if (!(imagePath.startsWith("http://res.cloudinary.com/dwu4qlxsw/image/upload"))) {
        return null;
    }
    const publicId = imagePath.split("/").pop().split(".")[0];
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        return null;
    }
};