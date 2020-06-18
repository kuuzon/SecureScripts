const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Schema: User
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    }
}));

//Joi Validation
function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(250).email().required(),
        password: Joi.string().min(5).max(1000).required()
    });
    return schema.validate(user)
};

//Export User module & JOI validation module
module.exports.User = User;
module.exports.validateUser = validateUser;