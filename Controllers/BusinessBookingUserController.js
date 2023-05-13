import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import BusinessBookingUser from "../Models/BusinessBookingUser.js";

export const BusinessBookingUserCreate = catchAsyncErrors(async (req, res, next) => {

  const {appuser_id,appplayland_id,starttime,endtime,bookingstatus,amount,method,paymentstatus} = req.body;

  try {

      const businessbookinguserrecord = await BusinessBookingUser.create({
        appuser_id,
        appplayland_id,
        starttime,
        endtime,
        bookingstatus,
        amount,
        method,
        paymentstatus,
      });

      res.status(201).json({
        success: true,
        businessbookinguserrecord,
      });

  } catch (error) {
    res.status(500).json({
      message: "error" + error
    });
  }


});



//////////////////////////// get business user booking  ////////////////////////
export const BookingUserData = catchAsyncErrors(async (req, res, next) => {

  try {

    const userbooking = await BusinessBookingUser.find({appuser_id: req.body.appuser_id});

    if (!userbooking) {
      return next(new ErrorHandler("Booking not found", 404));
    }
  
    res.status(201).json({ message: "success", userbooking });
    
  } catch (err) {
    console.error(err);
  }


});