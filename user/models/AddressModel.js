import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
  {

    doorNo:{
        type:String,
        required:true,
    },
    street:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    location:{
        type:[Number],
        required:true,
    }
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model("Addresses", AddressSchema);

export default AddressModel;
