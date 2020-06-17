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
    email: String,
    medScript: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MedScript'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    pharm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharm'
    }
}));

//Validation Schema: Patient
function validatePatient(patient){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        birthdate: Joi.date().timestamp('javascript').less('now'),
        address: Joi.object({
            streetNumber: Joi.number().integer().min(1).max(9999).required(),
            street: Joi.string().min(3).max(50).required(),
            city: Joi.string().min(3).max(50),
            state: Joi.string().min(3).max(20).required(),
            postcode: Joi.number().integer(4)
        }),
        email: Joi.string().email(),
        medScriptId: Joi.required(),
        doctorId: Joi.required(),
        pharmId: Joi.required()
    });
    return schema.validate(patient);
};

//Export schema/validation modules
module.exports.Patient = Patient;
module.exports.validatePatient = validatePatient;