const express = require('express');
const questionRouter = require('./src/Routes/questionRouter');
const companyRouter = require("./src/Routes/companyRoute");
const answerRouter = require("./src/Routes/answersRoute");
const authRouter = require("./src/Routes/authRoute");
const cors = require("cors");


const allowedOrigins = ["http://localhost:5173"]



const app = express();

app.use(cors({
    origin : function (origin,callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true);
        }else{
            callback(new Error('Not Allowed By Cors'))
        }
    },
    credentials : true
}))

app.use(express.json());
app.use("/api/v1/questions",questionRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/answers",answerRouter);
app.use("/api/v1/auth",authRouter);

app.use('/',(req,res,next)=>{
    res.send({
        status : "success",
        error : false
    })
    next();
})


module.exports = app;