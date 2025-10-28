
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');


function jwtToken(userId){
    let accessToken = jwt.sign({id : userId},process.env.JWT_SECRET_STRING,{
        expiresIn : '4d'
    })
    let refreshToken = jwt.sign({id : userId},process.env.JWT_SECRET_STRING,{
        expiresIn : "1y"
    })
    return accessToken;
}


exports.validateToken = async(req,res) =>{
    try {
        const currToken = req.headers.authorization;
        let token;

        if(currToken && currToken.startsWith("Bearer")){
            token = currToken.split(" ")[1];
        }

        if(!token){
            return res.status(400).json({
                stauts : "fail",
                message : "Token NOt Valid"
            })
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_STRING);

        if(decodedToken){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        res.status(400).json({
            status : 'fail',
            error
        })
    }
}

exports.signUp = async(req,res)=>{
    try {
        const createdUser = await User.create(req.body);
        await createdUser.save();
        const userCreated = await User.find({email : createdUser.email}).select("-password");
        const accessToken = jwtToken(userCreated.id);

        res.status(201).json({
            status : "success",
            token : accessToken,
            user : userCreated
        })

    } catch (error) {
        res.status(400).json({
            status : 'fail',
            error
        })
    }
}

exports.login = async (req,res) =>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                status : "fail",
                message : "Email & Password is required."
            })
        }

        const user = await User.findOne({email : email}).select("+password");
        if(!user){
            return res.status(400).json({
                status : "fail",
                message : "Invalid User Id"
            })
        }

        const userDetails = await User.find({email : email});
        const passwordStatus = await user.comparePassword(password)
        if(!passwordStatus){
            return res.status(400).json({
                status : "fail",
                message : "Invalid Password"
            })
        }
        const accessToken = jwtToken(user.id)
        if(user && passwordStatus){
            res.status(200).json({
                status : "success",
                accessToken,    
                userDetails
            })
        }
    } catch (error) {
         res.status(400).json({
            status : 'fail',
            error
        })
    }
}