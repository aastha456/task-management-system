import cloudinary from "../configurations/cloudinary";

export const uploadToCloudinary = async (fileBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "tasks" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(fileBuffer);
  });
};