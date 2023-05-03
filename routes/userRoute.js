import express from "express";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg")
  }
});
const upload = multer({ storage: storage });
import {AppUserSet} from "../Controllers/AppUSerController.js";
import {AppBooking} from "../Controllers/BookingUserController.js";
import {CreatePlaylandUser, PlaylandAllData} from "../Controllers/PlaylandUserController.js";
import { BusinessUserSet } from "../Controllers/BusinessUserController.js";
import {  BusinessPlaylandData } from "../Controllers/BusinessPlaylandUserController.js";
import { BusinessBookingUserCreate } from "../Controllers/BusinessBookingUserController.js";

const userRouter = express.Router();

userRouter.route("/appuser").post(AppUserSet);

userRouter.route("/appbooking").post(AppBooking);

// userRouter.route("/playlanduser").post(upload.single("image"),PlaylandUserCreate);

userRouter.route("/create/playlanduser").post(CreatePlaylandUser);

userRouter.route("/playlandrecord").get(PlaylandAllData)

// business user end point

userRouter.route("/businessuser").post(BusinessUserSet);

// userRouter.route("/businessplaylanduser").post(upload.single("image"),BusinessPlaylandUserCreate);

userRouter.route("/user/playland").get(BusinessPlaylandData)

userRouter.route("/businessbookinguser").post(BusinessBookingUserCreate);

export default userRouter;
