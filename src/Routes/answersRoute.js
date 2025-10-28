
const express = require("express");
const ansersController = require("./../Controllers/answersController");

const router = express.Router();

router.route("/saveAnswers").post(ansersController.saveAnswers);

module.exports = router;