
const Company = require('./../Model/companyModel');


exports.getCompanyandRole = async (req,res)=>{
    try {
        const companyData = await Company.find();
        res.status(201).json({
            status : "success",
            companies : companyData.length,
            companyData
        })
    } catch (error) {
        res.status(400).json({
            status : "fail",
            error
        })
    }
}

exports.addCompanyandRole = async (req,res)=>{
    try {
        const company = new Company(req.body);
        await company.save();

        res.status(201).json({
            status : "success",
            company
        })

    } catch (error) {
        res.status(400).json({
            status : "fail",
            error
        })
    }
}