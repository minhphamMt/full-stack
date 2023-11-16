import express from "express";
require("dotenv").config();
import configViewEngine from "./config/viewengine";
import initWebRouters from "./router/web";
import bodyParser from "body-parser";
// import { connection } from "./config/connectDB";
const app = express();
configViewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initWebRouters(app);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(">>> App is running in the localhost:", PORT);
});
