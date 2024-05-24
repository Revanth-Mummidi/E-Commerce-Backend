import axios from "axios";
import UserModel from "../models/UserModel.js";
import { PRODUCTS_BASEURL } from "../services/Base_Urls.js";
import ApiResponse from "../utils/ApiResponse.js";
import httpsStatusCodes from "../utils/httpStatusCodes.js";

export const getWishlist = async (req, res) => {
  const uid = req.uid;
  const user = await UserModel.findOne({ uid });
  const { data } = await axios.get(`${PRODUCTS_BASEURL}/products/arr`, {
    arr: user.wishList,
  });
  const response = new ApiResponse(
    httpsStatusCodes.ACCEPTED,
    data,
    "Succesfully sent wishlist"
  );
  return res.json(response);
};

export const updateWishlist = async (req, res) => {
  const uid = req.uid;
  const { product_id } = req.params;
  let new_wishlist = [];
  const wishList = user.wishList;
  const user = await UserModel.findOne({ uid });
  if (user.wishList.includes(product_id)) {
    new_wishlist = wishList.filter((item) => item !== product_id);
  } else {
    new_wishlist = [...wishList, product_id];
  }
  await UserModel.findOneAndUpdate({ uid }, { $set: { wishList: wishList } });

  const response = new ApiResponse(
    httpsStatusCodes.ACCEPTED,
    null,
    "Succesfully Updated wishlist"
  );
  return res.json(response);
};
