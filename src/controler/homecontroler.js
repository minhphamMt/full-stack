import {
  CreateNew,
  hashUSerPassword,
  getUser,
  DeleteUser,
  UpdateUser,
  getUserUpdate,
} from "../service/userService";
const handleHomePage = (req, res) => {
  return res.render("home.ejs");
};
const userPage = async (req, res) => {
  let UserList = await getUser();
  console.log(">>>check List user:", UserList);
  return res.render("users.ejs", { UserList: UserList });
};
const handleCreateNew = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  CreateNew(email, password, username);
  console.log("check data :", email, password, username);
  return res.redirect("/user");
};
const handleDelete = async (req, res) => {
  let id = req.params.id;
  await DeleteUser(id);
  return res.redirect("/user");
};
const handleUpdate = async (req, res) => {
  let id = req.params.id;
  let userList = await getUserUpdate(id);
  let user = userList && userList.length > 0 ? userList[0] : {};
  return res.render("updateuser.ejs", { id: id, user: user });
};
const handleUpdate2 = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  await UpdateUser(id, email, username);
  return res.redirect("/user");
};
module.exports = {
  handleHomePage,
  userPage,
  handleCreateNew,
  handleDelete,
  handleUpdate,
  handleUpdate2,
};
