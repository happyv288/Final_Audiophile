// sets up cloudnary for images storing/uploading
// cloudinary is a cloud service that stores and servers images.
// Instead of storing images on our server (which would be slow), we upload them to cloudinary and store the URL in MongoDB

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// configure cloudinary with credentials from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

// Upload an image to cloudinary and return the result
// imagepath can be a disk or base string
export const uploadImage = async (
  imagePath: string,
  folder: string = "audiophile", // defaul folder name in cloudinary
) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder, // organise images in folders
      resources_type: "image", // Tell cloudinary its an image
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// Delete an image from cloudinary using its public ID
// PublicID is returned when you upload (result.public_id)
export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};
