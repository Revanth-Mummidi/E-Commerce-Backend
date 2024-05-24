

import AddressModel from "../models/AddressModel.js";
import UserModel from "../models/UserModel.js";
import ApiResponse from "../utils/ApiResponse.js";

// Address

export const addAddress = async (req, res) => {
    const uid = req.uid;
    const userProfile = await UserModel.find({ uid });
    if (userProfile) {
      const {
        doorNo,
        street,
        city,
        district,
        state,
        country,
        pincode,
        location
      } = req.body;
      const address = new AddressModel({
        doorNo,
        street,
        city,
        district,
        state,
        country,
        pincode,
        location,
      });
      await address.save();
      userProfile.addresses.push(address._id);
      await userProfile.save();
      const response = new ApiResponse(201,address, "Added new Address");
      return res.json(response);
    } else {
      throw new Error("User/Address not found");
    }
  };
  
export const editAddress = async(req, res) => {
    const uid = req.uid;
    const {adrs_id} = req.params;
    const userProfile = await UserModel.find({ uid });
    if (userProfile && adrs_id) {
      const {
        doorNo,
        street,
        city,
        district,
        state,
        country,
        pincode,
        location
      } = req.body;
      const address = new AddressModel({
        doorNo,
        street,
        city,
        district,
        state,
        country,
        pincode,
        location,
      });
      await AddressModel.findByIdAndUpdate(adrs_id,(err,docs)=>{
        if(err){
            console.log("ERROR AT EDITING ADDRESS",err);
          throw new Error(err);
        }
        else{
            const response = new ApiResponse(200,docs, "Edited Address");
            return res.json(response);
        }
     });      
    

    } else {
        throw new Error("User/Address not found");
    }
  };
  
export const deleteAddress = async(req, res) => {
     const uid = req.uid;
     const {adrs_id}=req.params;
     const userProfile = await UserModel.find({ uid });
     if((userProfile) && adrs_id)
     {
         
         await AddressModel.findByIdAndDelete(adrs_id);
         userProfile.addresses = userProfile.addresses.filter((id) => id!== adrs_id );
         await userProfile.save();
         const response = new ApiResponse(202,null, "Deleted Address");
         return res.json(response);
     }
     else
     {
        throw new Error("User/Address not found");
     }     
};