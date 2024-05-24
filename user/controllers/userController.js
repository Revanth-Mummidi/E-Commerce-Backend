// User

import UserModel from "../models/UserModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary, { deleteAssestsFromCloudinary } from "../utils/Cloudinary.js";
import httpsStatusCodes from "../utils/httpStatusCodes.js";

export const createUser = async(req, res) => {
  const uid = req.uid;
  const profileImage=req.file;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    gender,
  } = req.body;
  const user=await UserModel.findOne({uid});
  if(user)
  {
   const response=new ApiResponse(httpsStatusCodes.CONFLICT,null,"User already exist");
   return res.json(response);
  }
  let profilePicture={};
  if(profileImage.path)
  {
    const urlRes=await uploadOnCloudinary(profileImage.path);
    profilePicture["secure_url"]=urlRes.secure_url;
    profilePicture["public_id"]=urlRes.public_id;
  }
  
 
  const userProfile = new UserModel({
    uid,
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    profilePicture,
    gender,
  });
  await userProfile.save();
  const response=new ApiResponse(httpsStatusCodes.OK,userProfile,"New user created Successfully");
  return res.json(response);
};

export const getUser = async (req, res) => {
  const uid = req.uid;
  const userProfile = await UserModel.findOne({uid});
  if (userProfile) {
    const response = new ApiResponse(httpsStatusCodes.OK, userProfile);
    return res.json(response);
  } else {
    const response = new ApiResponse(
      httpsStatusCodes.NOT_FOUND,
      null,
      "User not found"
    );
    return res.json(response);
  }
};

export const editUser =async (req, res) => {
  const uid = req.uid;
  const profileImage=req.file;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    gender,
  } = req.body;
  const user=await UserModel.findOne({uid});
  let profilePicture={};
  if(profileImage && profileImage.path )
  {
    if(user.profilePicture.public_id)
    {
       await deleteAssestsFromCloudinary(user.profilePicture.public_id);
    }
    const urlRes=await uploadOnCloudinary(profileImage.path);
    profilePicture["secure_url"]=urlRes.secure_url;
    profilePicture["public_id"]=urlRes.public_id;
  }
  
 
  const updated_user = await UserModel.findOneAndUpdate({uid},{
    $set:{
    firstName,
    lastName,
    email,
    phoneNumber,
    role,
    profilePicture,
    gender,
  }});
  
  const response=new ApiResponse(httpsStatusCodes.OK,updated_user,"User updated Successfully");
  return res.json(response);
};

export const deleteUser =async(req, res) => {
  const uid = req.uid;

  
  const user=await UserModel.findOne({uid});
     
  if(user.profilePicture.public_id)
  {
     await deleteAssestsFromCloudinary(user.profilePicture.public_id);
  }
  await user.deleteOne();
  const response=new ApiResponse(httpsStatusCodes.ACCEPTED,user,"User deleted Successfully");
  return res.json(response);
};

// Profile Picture

export const updateProfilePicture = async(req, res) => {
  const uid = req.uid;
  const profileImage=req.file;
  let profilePicture={};
  if(profileImage.path)
  {
    const urlRes=await uploadOnCloudinary(profileImage.path);
    profilePicture["secure_url"]=urlRes.secure_url;
    profilePicture["public_id"]=urlRes.public_id;
  }
   
  const user=await UserModel.findOne({uid});
  if(user.profilePicture.public_id)
  {
     await deleteAssestsFromCloudinary(user.profilePicture.public_id);
  }
 user.profilePicture=profilePicture;
   await user.save();
  const response=new ApiResponse(httpsStatusCodes.OK,user,"Updated Profile picture Successfully");
  return res.json(response);
};

export const deleteProfilePicture = async(req, res) => {
  const uid = req.uid;
  const profileImage=req.file;
    
  if(user.profilePicture.public_id)
  {
     await deleteAssestsFromCloudinary(user.profilePicture.public_id);
  }
  const user=await UserModel.updateOne({uid},{
    $unset:{profilePicture:{}}
  });
  
  const response=new ApiResponse(httpsStatusCodes.OK,user,"Deleted Profile picture Successfully");
  return res.json(response);
};
