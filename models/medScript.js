//Import packages
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const moment = require('moment');

//Schema: MedScript
const MedScript = mongoose.model('MedScript', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    quantity: Number,
    repeats: Number,
    issueDate: {
        type: Date, 
        default: moment()
    },
    expiryDate: {
        type: Date,
        default: moment().add(365, 'days')
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }
}));

//Validation Schema: MedScript
function validateMedScript(medScript){
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        quantity: Joi.number().integer().min(1).max(200).required(),
        repeats: Joi.number().integer().min(0).max(12).required(),
        issueDate: Joi.date(),
        expiryDate: Joi.date(),
        doctorId: Joi.required()
    });
    return schema.validate(medScript);
};

//Export schema/validation modules
module.exports.MedScript = MedScript;
module.exports.validateMedScript = validateMedScript;