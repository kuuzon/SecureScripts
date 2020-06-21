//Import packages
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Schema: Patient
const Doctor = mongoose.model('Doctor', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },  
    clinicName: {
        type: String,
        required: true,
    },
    clinicStreetNumber: {
        type: Number,
        required: true
    },
    clinicStreetName: {
        type: String,
        required: true
    },
    clinicCity: {
        type: String,
        required: true
    },
    clinicState: {
        type: String,
        uppercase: true,
        required: true
    },
    clinicPostcode: {
        type: Number,
        required: true
    },
    email: String,
}));

//Validation Schema: Patient
function validateDoctor(doctor){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        clinicName: Joi.string().min(3).max(100).required(),
        clinicStreetNumber: Joi.number().integer().min(1).max(9999).required(),
        clinicStreetName: Joi.string().min(3).max(50).required(),
        clinicCity: Joi.string().min(3).max(50),
        clinicState: Joi.string().min(3).max(20).required(),
        clinicPostcode: Joi.number().integer(4),
        email: Joi.string().email()
    });
    return schema.validate(doctor);
};

//Export schema/validation modules
module.exports.Doctor = Doctor;
module.exports.validateDoctor = validateDoctor;