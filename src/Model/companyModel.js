

const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    companyName : {
        type : String,
        required : [true,"Company Name is Required"]
    },
    role : {
        type : String,
        required : [true,"Role is Required"]
    },
    slug : {
        type : String,
        required : [true,"Slug is Required"]
    },
})

module.exports = mongoose.model("Company",companySchema);