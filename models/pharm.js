//Import packages
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Schema: Patient
const Pharm = mongoose.model('Pharm', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    pharmStreetNumber: {
        type: Number,
        required: true
    },
    pharmStreetName: {
        type: String,
        required: true
    },
    pharmCity: {
        type: String,
        required: true
    },
    pharmState: {
        type: String,
        uppercase: true,
        required: true
    },
    pharmPostcode: {
        type: Number,
        required: true
    },
    headPharmacist: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: String
}));

//Validation Schema: Patient
function validatePharm(pharm){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        pharmStreetNumber: Joi.number().integer().min(1).max(9999).required(),
        pharmStreetName: Joi.string().min(3).max(50).required(),
        pharmCity: Joi.string().min(3).max(50).required(),
        pharmState: Joi.string().min(3).max(20).required(),
        pharmPostcode: Joi.number().integer(4),
        headPharmacist: Joi.string().min(3).max(80).required(),
        email: Joi.string().email().required()
    });
    return schema.validate(pharm);
};

//Export schema/validation modules
module.exports.Pharm = Pharm;
module.exports.validatePharm = validatePharm;