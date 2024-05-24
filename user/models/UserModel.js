import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
      index: { unique: true },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    phoneNumber: {
      type: String,
      required: true,
    //   index: { unique: true },
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user","seller"],
    },
    profilePicture: {
      type:{
        secure_url:String,
        public_id: String,
      },
      required: true,
    },
    gender:{
      type:String,
      default:"none",
      enum:["Male","Female","Others"],
    },
    wishList: {
      type: Array,
      default: [],
    },
    addresses:[{
      type: Schema.Types.ObjectId,
      ref: "Addresses",
    }]
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
