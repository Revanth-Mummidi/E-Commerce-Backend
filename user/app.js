import express from "express"
// import  mongoDbConfig  from "./utils/db_config.js"
import cors from "cors"
import userRouter from "./routes/routes.js";
import exceptionHandler from "./utils/ExceptionHandling.js";

const expressApp = express();

expressApp.use(cors());

expressApp.use(express.json());

expressApp.get('/',(req,res)=>{
    res.send("User Server ");
})

expressApp.use(userRouter);

expressApp.use(exceptionHandler);

export default expressApp;