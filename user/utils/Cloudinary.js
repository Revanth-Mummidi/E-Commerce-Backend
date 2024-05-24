import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CloudinaryFolder = "users";
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: CloudinaryFolder,
    });

    console.log("File is uploaded on cloudinary", response);
    return response;
  } catch (error) {
    fs.unlink(localFilePath);
    return null;
  }
};

export const deleteAssestsFromCloudinary=async( public_id)=>
{
  try{
    if(!public_id) return null;
    await cloudinary.uploader.destroy(public_id);
  }
  catch(err)
  {
     console.log(err);
     throw err;
  }
}
export default uploadOnCloudinary;
