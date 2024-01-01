import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Admin from "../Models/Admin.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import AppUser from "../Models/AppUser.js";
import PlaylandUser from "../Models/PlaylandUser.js";

/// register user  ////////

export const registerAdmin = catchAsyncErrors(async (req, res, next) => {

  try {
    
  const { name, email, password } = req.body;

  const user = await Admin.create({
    name,
    email,
    password,
  });

  sendToken(user, 200, res);

} catch (error) {
  res.status(500).json({ message: "error" + error });
}

  // const token = user.getJWTToken();

  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
});


//// login user /////

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  /// check if the user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("please enter Email & password", 400));
  }
  const user = await Admin.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(), "Invalid email & password", 401);
  }
  // console.log(user);
  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler(), "Invalid email & password", 401);
  }

  sendToken(user, 200, res);

  // const token = user.getJWTToken();

  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
});

///// logout /////
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

///// forgot password /////
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await Admin.findOne({ email: req.body.email });
  // console.log(user);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  /////// get reset password token from user model that we create ///////
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  console.log(resetPasswordUrl);

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


///////////// get All users function ////////////////////
export const Allusers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const totalCount = await AppUser.countDocuments();

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // console.log(startIndex + "|" + endIndex);
    const users = await AppUser
      .find()
      .skip(startIndex)
      .limit(limit);
    // console.log(users);
    users.forEach((productPath) => {
      productPath.path = `${req.protocol}://${req.hostname}:${process.env.PORT}/${productPath.path}`;
    });
    const totalPage = Math.ceil(totalCount / limit);

    res
      .status(200)
      .json({ message: "success", users, totalPage, totalCount });
  } catch (error) {
    res.status(500).json({ message: "error" + error });
  }
};

///////////// get All Playlands function ////////////////////
export const Allplaylands = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const totalCount = await PlaylandUser.countDocuments();
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;
    // console.log(startIndex + "|" + endIndex);
    const playlands = await PlaylandUser
      .find({ name: { $regex: search } })
      .skip(startIndex)
      .limit(limit);
    // console.log(playlands);
    playlands.forEach((productPath) => {
      productPath.path = `${req.protocol}://${req.hostname}:${process.env.PORT}/${productPath.path}`;
    });
    const totalPage = Math.ceil(totalCount / limit);

    res
      .status(200)
      .json({ message: "success", playlands, totalPage, totalCount });
  } catch (error) {
    res.status(500).json({ message: "error" + error });
  }
};
