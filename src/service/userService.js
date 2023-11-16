import bcrypt, { hash } from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
const hashUSerPassword = (userPass) => {
  let hashPassWord = bcrypt.hashSync(userPass, salt);
  let check = bcrypt.compareSync(userPass, hashPassWord);
  return hashPassWord;
};
const CreateNew = async (email, password, username) => {
  let hashPassWord = hashUSerPassword(password);
  try {
    return await db.User.create({
      email: email,
      password: hashPassWord,
      username: username,
    });
  } catch (err) {
    if (err) {
      console.log(">>>check err:", err);
    }
  }
};
const getUser = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute("select * from users");
    return row;
  } catch (err) {
    console.log(">>>check err:", err);
  }
};
const DeleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  const [row, fields] = await connection.execute(
    `DELETE from users where id=${id}`
  );
};
const UpdateUser = async (id, email, username) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  const [row, fields] = await connection.execute(
    `UPDATE users
    SET email=?,username=?
    WHERE id=?`,
    [email, username, id]
  );
};
const getUserUpdate = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [row, fields] = await connection.execute(
      `SELECT * FROM users WHERE id=${id}`
    );
    return row;
  } catch (err) {
    console.log(">>>check err:", err);
  }
};
module.exports = {
  hashUSerPassword,
  CreateNew,
  getUser,
  DeleteUser,
  UpdateUser,
  getUserUpdate,
};
