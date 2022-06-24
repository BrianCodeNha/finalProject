import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const userSchema = new Schema({  
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  username: { 
    type: String,
    require: true
  },
  active: { 
    type: Boolean,
    require: true
  },
  
});


export const User = mongoose.model("User", userSchema);

