import express from "express";
import {
  handleHomePage,
  userPage,
  handleCreateNew,
  handleDelete,
  handleUpdate,
  handleUpdate2,
} from "../controler/homecontroler";
const router = express.Router();
const initWebRouters = (app) => {
  router.get("/", handleHomePage);
  router.get("/user", userPage);
  router.post("/user/create-user", handleCreateNew);
  router.post("/delete-user/:id", handleDelete);
  router.post("/update-user/:id", handleUpdate);
  router.post("/user/update-user", handleUpdate2);
  return app.use("/", router);
};
export default initWebRouters;
