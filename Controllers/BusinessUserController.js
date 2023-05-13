import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import BusinessUser from "../Models/BusinessUser.js";

export const BusinessUserSet = catchAsyncErrors(async (req, res, next) => {

    const businessuserdata = await BusinessUser.findOne({firebase_id: req.body.firebase_id});
    const { firebase_id,name, email, phone, latitude, longitude,location, image } = req.body;
    
    
    
  if (!businessuserdata) {

    const businessuserdata = await BusinessUser.create({
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
    businessuserdata,
  });

  }else{

    businessuserdata.name = name;
    businessuserdata.email = email;
    businessuserdata.phone = phone;
    businessuserdata.latitude = latitude;
    businessuserdata.longitude = longitude;

        await businessuserdata.save();

        res.status(200).json({ 

            message: "success",
             businessuserdata 
        });

    
  }


});










