import firebase from "firebase-admin";
import firebaseApp from "../config/firebaseSdkConfig.js";
import ApiResponse from "../utils/ApiResponse.js";


export const verifyToken=async(req,res,next)=>{
    const bearerHeader = req.headers.authorization;
    if(bearerHeader==undefined){
        const response=new ApiResponse(401,null,"Please Pass Provided authorization token");
        return res.json(response);
    }
    else{
        const bearer=bearerHeader.split(' ');
        if([...bearer].length>=2){
        try{
        const bearerToken=bearer[1];
        const decodedUserInfo=await firebaseApp.auth().verifyIdToken(bearerToken);
        if(decodedUserInfo){
          req.uid=decodedUserInfo.uid;
          req.authenticated=true;
          return next();
        }
        else{
            throw Error("Failed to verify token");
        }
        }
        catch(err){
            console.log(err)
            if(err.code==="auth/id-token-expired")
            {
                const response=new ApiResponse(401,null,"Token Expired");
            return res.json(response);
            }
            else{
            const response=new ApiResponse(500,null,"Internal Server error");
            return res.json(response);
            }
        }
        }
        else
        {
        const response=new ApiResponse(401,null,"Please Pass Provided authorization token");
        return res.json(response);
        }
    }
}

