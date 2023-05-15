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
import {AppUserSet, AppUserData} from "../Controllers/AppUSerController.js";
import {AppBooking, AppBookingData} from "../Controllers/BookingUserController.js";
import {CreatePlaylandUser, PlaylandAllData} from "../Controllers/PlaylandUserController.js";
import { BusinessUserSet } from "../Controllers/BusinessUserController.js";
import {  BusinessPlaylandData } from "../Controllers/BusinessPlaylandUserController.js";
import { BusinessBookingUserCreate, BookingUserData, BusinessPlaylandBooked } from "../Controllers/BusinessBookingUserController.js";

const userRouter = express.Router();

userRouter.route("/appuser").post(AppUserSet);

userRouter.route("/user/record/:id").get(AppUserData);


userRouter.route("/appbooking").post(AppBooking);

userRouter.route("/appbookingdata/:id").get(AppBookingData);

// userRouter.route("/playlanduser").post(upload.single("image"),PlaylandUserCreate);

userRouter.route("/create/playlanduser").post(CreatePlaylandUser);

userRouter.route("/playlandrecord").get(PlaylandAllData);

// business user end point

userRouter.route("/businessuser").post(BusinessUserSet);

// userRouter.route("/businessplaylanduser").post(upload.single("image"),BusinessPlaylandUserCreate);

userRouter.route("/user/playland/:id").get(BusinessPlaylandData);

userRouter.route("/booked/playland/:id").get(BusinessPlaylandBooked);

userRouter.route("/businessbookinguser").post(BusinessBookingUserCreate);

userRouter.route("/userbooking/:id").get(BookingUserData);

export default userRouter;
