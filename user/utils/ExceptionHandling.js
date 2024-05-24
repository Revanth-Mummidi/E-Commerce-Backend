import ApiResponse from "./ApiResponse.js"

const exceptionHandler = (err,req,res,next) => {
    const message=err.message || "Something went wrong";
    console.log("Error rised is ", message);
    const response = new ApiResponse(500,null,message);
    return res.json(response);
}
export default exceptionHandler;