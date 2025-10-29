
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is Required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true
    },
    password : {
        type : String,
        required : [true,"Password is required"],
        select : false,
        trim : true
    },
    credits : {
        type : Number,
        default : 15
    }
})

userModel.pre("save",async function(next){
    if (!this.isModified("password")) return next(); 
  this.password = await bcrypt.hash(this.password, 12);
  next();
})


userModel.methods.comparePassword = async function(userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword,this.password);
}

const User = mongoose.model("User",userModel);
module.exports = User;