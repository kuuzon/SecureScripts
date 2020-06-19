//Import middleware
const auth = require('../middleware/auth');

//Import schemas/validation modules
const {User, validateUser} = require('../models/user');

//Import packages
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
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    //Hash & Salt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //Save user data to database & response to client (lodash out password)
    await user.save();

    //Generate JSON Web Token (on creation of user) & store in header
    const token = user.generateAuthToken();
    res.header('x-auth-token', token);

    //Return id, name and email to client (NOT password)
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

//[2] Read (get) Route
// Display own user profile details
router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

//Export router
module.exports = router;