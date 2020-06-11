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
    clinicAddress: {
        name: String,
        streetNumber: Number,
        street: String,
        city: String,
        state: {
            type: String,
            uppercase: true
        },
        postcode: Number
    },
    email: String
}));

//Validation Schema: Patient
function validateDoctor(doctor){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        clinicAddress: Joi.object({
            name: Joi.string().min(3).max(100).required(),
            streetNumber: Joi.number().integer().min(1).max(9999).required(),
            street: Joi.string().min(3).max(50).required(),
            city: Joi.string().min(3).max(50),
            state: Joi.string().min(3).max(20).required(),
            postcode: Joi.number().integer(4)
        }),
        email: Joi.string().email()
    });
    return schema.validate(doctor);
};

//Export schema/validation modules
module.exports.Doctor = Doctor;
module.exports.validateDoctor = validateDoctor;