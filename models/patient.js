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
    patientStreetNumber: {
        type: Number,
        required: true
    },
    patientStreetName: {
        type: String,
        required: true
    },
    patientCity: {
        type: String,
        required: true
    },
    patientState: {
        type: String,
        uppercase: true,
        required: true
    },
    patientPostcode: {
        type: Number,
        required: true
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
        patientStreetNumber: Joi.number().integer().min(1).max(9999).required(),
        patientStreetName: Joi.string().min(3).max(50).required(),
        patientCity: Joi.string().min(3).max(50),
        patientState: Joi.string().min(3).max(20).required(),
        patientPostcode: Joi.number().integer(4),
        email: Joi.string().email(),
        medScriptId: Joi.objectId().required(),
        doctorId: Joi.objectId().required(),
        pharmId: Joi.objectId().required()
    });
    return schema.validate(patient);
};

//Export schema/validation modules
module.exports.Patient = Patient;
module.exports.validatePatient = validatePatient;