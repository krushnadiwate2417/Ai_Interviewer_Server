
const Answer = require("../Model/answersModel");


exports.saveAnswers = async (req,res)=>{
    try {
        const answer = new Answer(req.body);
        await answer.save();

        res.status(201).json({
            status : "success",
            message : "Record saved successfully",
        })

    } catch (error) {
        res.status(400).json({
            status : "fail",
            error
        })
    }
}