import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import BusinessBookingUser from "../Models/BusinessBookingUser.js";
import connectDb from "../config/database.js";
import dotenv from "dotenv";
import { response } from "express";
dotenv.config();
import stripePackage from 'stripe';

const stripeSecretKey = process.env.SECRET_KEY;
const stripe = stripePackage(stripeSecretKey);




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

    const id = req.params.id;
    const userbooking = await BusinessBookingUser.find({appuser_id: id});

    if (!userbooking) {
      return next(new ErrorHandler("Booking not found", 404));
    }
  
    res.status(201).json({ message: "success", userbooking });
    
  } catch (err) {
    console.error(err);
  }


});


////////////////////////////  Booked playland record ////////////////////////
export const BusinessPlaylandBooked = catchAsyncErrors(async (req, res, next) => {

  try {

    const id = req.params.id;

    const bookedplayland = await BusinessBookingUser.find({appplayland_id: id});

    if (!bookedplayland) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(201).json({ message: "success", bookedplayland });
    
  } catch (err) {
    console.error(err);
  }


});


export const PaymentCreate = catchAsyncErrors(async (req, res, next) => {


  try {
    stripe.customers.create({

      email:req.body.stripeEmail,
      source:req.body.stripeToken,
      name:req.body.name,

    })
    .then((customer)=>{
      return stripe.charages.create({
        amount:req.body.amount,
        currency:"USD",
        customer:customer.id,

      })
    })
    .then((charage)=>{
      response.send(charage);
    }) 

  } catch (err) {
    console.error(err);
  }

});