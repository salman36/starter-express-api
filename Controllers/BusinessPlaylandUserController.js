import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import BusinessPlaylandUser from "../Models/BusinessPlaylandUser.js";

export const BusinessPlaylandUserCreate = catchAsyncErrors(async (req, res, next) => {

  try {

    const record = new BusinessPlaylandUser({

      path: req.body.img_path,
      playland_name: req.body.playland_name,
      discription: req.body.discription,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      time_open: req.body.time_open,
      time_close: req.body.time_close,
      price: req.body.price,
      discount: req.body.discount,

    });
    await record.save();
    // res.send('Record saved successfully.');
    res.status(201).json({
      message: "success",
      record
    });

  } catch (err) {
    console.error(err);
  }


});



////////////////////////////  get All playland Record ////////////////////////
export const BusinessPlaylandAllData = catchAsyncErrors(async (req, res, next) => {

  try {

    await BusinessPlaylandUser.findOne({firebase_id: req.body.firebase_id});

    BusinessPlaylandUser.find({}, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.json(data);
      }
    });
    
  } catch (err) {
    console.error(err);
  }


});