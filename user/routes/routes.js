import express from 'express';
import { createUser, deleteProfilePicture, deleteUser, editUser, getUser, updateProfilePicture } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { addAddress, deleteAddress, editAddress } from '../controllers/addressController.js';
import multerMiddleware from '../middlewares/multerMiddleWare.js';
import { getWishlist, updateWishlist } from '../controllers/whislistController.js';

const userRouter = express.Router();

userRouter.get('/profile',verifyToken,getUser);
userRouter.post('/profile',verifyToken,multerMiddleware.single("profile_image"),createUser);
userRouter.put('/profile',verifyToken,editUser);
userRouter.delete('/profile',verifyToken,deleteUser);

userRouter.patch('/profile/pic',verifyToken,multerMiddleware.single("profile_image"),updateProfilePicture);
userRouter.delete('/profile/pic',verifyToken,deleteProfilePicture);

userRouter.post('/profile/address',verifyToken,addAddress);
userRouter.put('/profile/address/:adrs_id',verifyToken,editAddress);
userRouter.delete('/profile/address/:adrs_id',verifyToken,deleteAddress);

userRouter.get('/profile/wishlist',verifyToken,getWishlist);
userRouter.patch('/profile/wishlist/:product_id',verifyToken,updateWishlist);

export default userRouter;


