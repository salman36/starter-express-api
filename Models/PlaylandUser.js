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
  img_url: {
    type: String,
  },
  
});


const PlaylandUser = mongoose.model("playlanduser", userSchema);
export default PlaylandUser;
