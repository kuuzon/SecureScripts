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
    pharmAddress: {
        streetNumber: Number,
        street: String,
        city: String,
        state: {
            type: String,
            uppercase: true
        },
        postcode: Number
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
        pharmAddress: Joi.object({
            streetNumber: Joi.number().integer().min(1).max(9999).required(),
            street: Joi.string().min(3).max(50).required(),
            city: Joi.string().min(3).max(50),
            state: Joi.string().min(3).max(20).required(),
            postcode: Joi.number().integer(4)
        }),
        headPharmacist: Joi.string().min(3).max(80).required(),
        email: Joi.string().email()
    });
    return schema.validate(pharm);
};

//Export schema/validation modules
module.exports.Pharm = Pharm;
module.exports.validatePharm = validatePharm;