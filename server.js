const server = require('./app');
const dotenv = require('dotenv');
dotenv.config({path : "./config.env"})
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONN_STR)
.then(()=>console.log("DB Connection Successful"))
.catch((err)=>console.log(err));


const port = 3000;
server.listen(port,()=>{
    console.log(`Server started on port : ${port}`)
})