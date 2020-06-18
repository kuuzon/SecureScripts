//Import schemas/validation modules
const {User} = require('../models/user');

//Import packages
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const config = require('config');

//Import express 
const express = require('express');
const router = express.Router();

//Routes
//[1] Create (post) Route [User posts email & password to login form and we authenticate.  Nothing is saved]
//NOTE: Authentication = confirming user identity
//NOTE: Authorisation = access to system & routes
router.post('/', async(req, res) => {
    //Validation for posted data in body
    const {error} = validateAuth(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    //Authentication for existing email
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.  Please ensure you have entered your details correctly.');

    //Authentication for corresponding password to registered email
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.  Please ensure you have entered your details correctly.');

    //Generate JSON Web Token linked with User ID
    const token = user.generateAuthToken();

    //Success response to client (web token for security)
    res.send(token); 
});

//Validation for Auth
function validateAuth(auth){
    const schema = Joi.object({
        email: Joi.string().min(5).max(250).email().required(),
        password: Joi.string().min(5).max(250).required()
    });
    return schema.validate(auth)
};

//Export module
module.exports = router;