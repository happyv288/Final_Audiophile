// Sets up multer for handling file uploads (images)
// multer is a Node.js middleware for hadling multiparts/form data/uploads to thirdparty websites etc
// instead of saving files to mongoDB, we use memory storage and then upload directly to cloudinary

import multer from "multer";
import type { Request } from "express";

// memoryStorage keeps the files in RAM as a buffer (binary data)
// This is better than saving to database/disk when we're uploading to cloudinary
const storage = multer.memoryStorage();

// this filter m oonly allow image files
// this runs for every files upload attempts
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
): void => {
  // Check if the files MIME type starts with "image/" e.g, "image/jpeg", "image/png", "image/webp"
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // null = no error, true = accept the file
  } else {
    // reject non-images files
    cb(new Error("Only images files are allowed"));
  }
};

// Create the multer upload instance with our setting

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024, // Max 5 MB per file (5 * 1024 * 1024vbytes)
  },
});
export default upload;
