import mongoose from "mongoose";
// import validator from "validator";


const userSchema = new mongoose.Schema({
  playland_name: {
    type : String,

  },
  discription: {
    type : String,

  },
  latitude: {
    type : String,

  },
  longitude: {
    type : String,

  },
  time_open: {
    type : String,

  },
  time_close: {
    type : String,

  },
  price: {
    type : Number,

  },
  discount: {
    type : Number,

  },
  img_path: {
    type: String,
  },
  
});


const BusinessPlaylandUser = mongoose.model("businessplaylanduser", userSchema);
export default BusinessPlaylandUser;
