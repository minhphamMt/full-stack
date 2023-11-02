import express from "express";
require("dotenv").config();
import configViewEngine from "./config/viewengine";
import initWebRouters from "./router/web";
const app = express();
configViewEngine(app);
initWebRouters(app);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(">>> App is running in the localhost:", PORT);
});
