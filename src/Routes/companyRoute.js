
const express = require('express');
const companyController = require("./../Controllers/companyController");

const router = express.Router();

router.route("/addCompany").post(companyController.addCompanyandRole);
router.route("/getCompanies").get(companyController.getCompanyandRole);

module.exports = router

