//Import packages
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Schema: Patient
const Patient = mongoose.model('Patient', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    birthdate: {
        type: Date,
        required: true
    },
    address: {
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
function validatePatient(patient){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        birthdate: Joi.date().timestamp('javascript').less('now'),
        address: Joi.object({
            streetNumber: Joi.number().integer().min(1).max(10).required(),
            street: Joi.string().min(3).max(50).required(),
            city: Joi.string().min(3).max(50),
            state: Joi.string().min(3).max(20).required(),
            postcode: Joi.number().integer().min(4).max(4)
        }),
        email: Joi.string().email()
    });
    return schema.validate(patient);
};

//Export schema/validation modules
module.exports.Patient = Patient;
module.exports.validatePatient = validatePatient;