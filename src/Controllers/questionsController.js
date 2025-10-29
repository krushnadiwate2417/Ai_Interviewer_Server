
const interviewData = require("./../DummyData/questionos.json");
const Questions = require("./../Model/questionsModel");

exports.getQuestions = async (req,res)=>{
    try {
        res.status(200).json({
            status : "success",
            interviewData
        })
    } catch (error) {
        res.status(400).json({
            status : "fail",
            error : error.message
        })
    }
}

exports.getQuestionsAsRole = async (req,res) =>{
    try {
        const questionsSet = await Questions.findOne({slug : req.params.slug});

        res.status(200).json({
            status : "success",
            numberOfQuestions : questionsSet.questions.length,
            questionsSet 
        })
    } catch (error) {
        res.status(400).json({
            status : "fail",
            error : error.message
        })
    }
}

exports.addQuestions = async (req,res)=>{
    try {
        const questions = await Questions(req.body);
        await questions.save();

        res.status(201).json({
            status : "success",
            questions
        })
    } catch (error) {
        res.status(400).json({
            status : "fail",
            error : error.message
        })
    }
}
