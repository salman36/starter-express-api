import express from "express";

import {
  loginUser,
  registerAdmin,
  logout,
  forgotPassword,
  Allusers,
  Allplaylands,
} from "../Controllers/AdminController.js";

const adminRouter = express.Router();

adminRouter.route("/register").post(registerAdmin);

adminRouter.route("/login").post(loginUser);

adminRouter.route("/logout").get(logout);

adminRouter.route("/password/forgot").post(forgotPassword);

adminRouter.route("/allusers").get(Allusers);

adminRouter.route("/allplaylands").get(Allplaylands);

export default adminRouter;