import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import PlaylandUser from "../Models/PlaylandUser.js";

export const PlaylandUserCreate = catchAsyncErrors(async (req, res, next) => {

  try {
    const record = new PlaylandUser({

      path: req.body.img_url,
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
export const PlaylandAllData = catchAsyncErrors(async (req, res, next) => {

  try {

    PlaylandUser.find({}, (err, data) => {
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