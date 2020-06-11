//Import packages
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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
    date: {
        type: Date, 
        default: Date.now
    },
    expired: Boolean
}));

//Validation Schema: MedScript
function validateMedScript(medScript){
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        quantity: Joi.number().integer().min(1).max(200).required(),
        repeats: Joi.number().integer().min(1).max(12).required(),
        expired: Joi.boolean().truthy('yes').falsy('no').sensitive().required()
    });
    return schema.validate(medScript);
};

//Export schema/validation modules
module.exports.MedScript = MedScript;
module.exports.validateMedScript = validateMedScript;

//Iteration notes: 
//Ensure the schema includes the FK for: [patientId, doctorId and pharmId]
//Change "expired" to "date" and structure validation to ensure the date is not expired (validation can occur both at mongoose level and joi level - combines expired and date entry into one)
//Add a "in stock function" - to pharm