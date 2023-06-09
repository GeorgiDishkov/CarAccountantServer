const Employers = require("../models/Employers")

exports.getAllEmployers = async () => {
    const data = await Employers.find({}, { password: 0, __v: 0 });

    if (!data) {
        return "No employers yet"
    }
    return data;
}

exports.getEmployerById = async (id) => await Employers.findById(id);

exports.getCurrentEmployer = async (id) => {
    const data = await Employers.findById(id);

    if (!data) {
        return null
    }
    return data;
}

exports.getEmployerByEmail = async (email) => {
    const data = await Employers.find({ email: email });

    if (!data) {
        return null
    }
    return data;
}

exports.updateEmployer = async (employerID, data) => {
    const employer = await Employers.findByIdAndUpdate(employerID, data)

    if (!employer) {
        throw new Error("Somethins gone wrong , please try again later")
    }
    return employer
}

exports.getAllEmployersFrom = async (id) => await Employers.find({ companyID: id });

exports.deleteEmployer = async (id) => Employers.findByIdAndDelete(id);