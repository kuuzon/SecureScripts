//Import schemas/validation
const {Pharm, validatePharm} = require('../models/pharm');

//Import express
const express = require('express');
const router = express.Router();

//Routes
//[1] READ (get) Route
router.get('/', async (req, res) => {
    const pharms = await Pharm.find().sort('name');
    res.send(pharms);
});

//[2] CREATE (post) Route


//[3] READ (get) Route for Specific Doctor ID


//[4] UPDATE (put) Route for Specific Doctor ID


//[5] DELETE (delete) Route for Specific Doctor ID


//Export module
module.exports = router;