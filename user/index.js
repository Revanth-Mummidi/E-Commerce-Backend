import expressApp from "./app.js";
// import  mongoDbConfig  from "./utils/db_config.js";
import * as dotenv from "dotenv";
import MongoConnect from "./config/db_config.js";

dotenv.config();
MongoConnect();

const PORT = process.env.PORT ;

const listenFunction = () => {
  console.log("Server is lisenting on PORT ",PORT)
}
expressApp.listen(PORT,listenFunction)


