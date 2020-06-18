//Import schemas/validation modules
const {User, validateUser} = require('../models/user');

//Import packages
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');

//Import express 
const express = require('express');
const router = express.Router();

//Routes
//[1] Create (post) Route
router.post('/', async(req, res) => {
    //Validation of posted body data
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Validation of unique email
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('Email already in use.  Please either login or create a unique account.');

    //Obtain user data 
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    //Hash & Salt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash('user password', salt);

    //Save user data to database & response to client (lodash out password)
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

//Export router
module.exports = router;