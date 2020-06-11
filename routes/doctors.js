//Import schemas/validation
const {Doctor, validateDoctor} = require('../models/doctor');

//Import express
const express = require('express');
const router = express.Router();

//Routes
//[1] READ (get) Route
router.get('/', async (req, res) => {
    const doctors = await Doctor.find().sort('name');
    res.send(doctors);
});

//[2] CREATE (post) Route


//[3] READ (get) Route for Specific Doctor ID


//[4] UPDATE (put) Route for Specific Doctor ID


//[5] DELETE (delete) Route for Specific Doctor ID


//Export module
module.exports = router;