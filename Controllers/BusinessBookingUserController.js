import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import BusinessBookingUser from "../Models/BusinessBookingUser.js";

export const BusinessBookingUserCreate = catchAsyncErrors(async (req, res, next) => {

  const {appuser_id,appplayland_id,starttime,endtime,bookingstatus,amount,method,paymentstatus} = req.body;

  try {

      const businessbookinguser = await BusinessBookingUser.create({
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
        businessbookinguser,
      });

  } catch (error) {
    res.status(500).json({
      message: "error" + error
    });
  }


});