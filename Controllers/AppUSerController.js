import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import AppUser from "../Models/AppUser.js";

export const AppUserSet = catchAsyncErrors(async (req, res, next) => {

    const appuserdata = await AppUser.findOne({firebase_id: req.body.firebase_id});
    const { firebase_id,name, email, phone, latitude, longitude,location, image } = req.body;
    
    
    
  if (!appuserdata) {

    const appuser = await AppUser.create({
        firebase_id,
        name,
        email,
        phone,
        latitude,
        longitude,
        location,
        image,
    });

    res.status(201).json({
    success: true,
    appuser,
  });

  }else{

    appuserdata.name = name;
    appuserdata.email = email;
    appuserdata.phone = phone;
    appuserdata.latitude = latitude;
    appuserdata.longitude = longitude;

        await appuserdata.save();

        res.status(200).json({ 

            message: "success",
             appuserdata 
        });

    
  }


});



//////////////////////////// get user Record ////////////////////////
export const AppUserData = catchAsyncErrors(async (req, res, next) => {

  try {
    const id = req.params.id;
    const userRecord = await AppUser.find({firebase_id: id});

    if (!userRecord) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    res.status(201).json({ message: "success", userRecord });
    
  } catch (err) {
    console.error(err);
  }


});










