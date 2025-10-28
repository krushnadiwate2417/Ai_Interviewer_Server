const express = require("express");
const questionsController = require("./../Controllers/questionsController");

const questionRouter = express.Router();

questionRouter.route("/getQuestions").get(questionsController.getQuestions);
questionRouter.route("/getQuestions/:slug").get(questionsController.getQuestionsAsRole);
questionRouter.route("/addQuestions").post(questionsController.addQuestions);

module.exports = questionRouter;