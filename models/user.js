//Import packages
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const { boolean } = require('@hapi/joi');

//Schema: User
//Overview: Class/object for the User schema.  Must detail the login requirements for the site, which provide various levels of administrative privledges depending on the type of user.
const userSchema = new mongoose.Schema({
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
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

//Add custom method to the Schema object: the Generate Web Token function
//REASON: When user is created, we also want to call the method function to generate a web token
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
};

//Model
const User = mongoose.model('User', userSchema);

//Joi Validation
function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    });
    return schema.validate(user)
};

//Export User module & JOI validation module
module.exports.User = User;
module.exports.validateUser = validateUser;