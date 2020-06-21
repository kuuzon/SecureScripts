//Import schemas/validation
const {Pharm, validatePharm} = require('../models/pharm');

//Import express
const express = require('express');
const router = express.Router();

//Overview: The various routes to display, add, update and delete the current registered pharmacies in the SecureScripts database.  As all information is publically available, and is not referencing secure information, there are no admin auth required.

//Routes
//[1] READ (get) Route
router.get('/', async (req, res) => {
    const pharms = await Pharm.find().sort('name');
    res.send(pharms);
});

//[2] CREATE (post) Route
router.post('/', async (req, res) => {
    //Test of FrontEnd form
    console.log(req.body)

    //Validation
    const {error} = validatePharm(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Create new pharm model + record post data
    let pharm = new Pharm({
        name: req.body.name,
        pharmStreetNumber: req.body.pharmStreetNumber,
        pharmStreetName: req.body.pharmStreetName,
        pharmCity: req.body.pharmCity,
        pharmState: req.body.pharmState,
        pharmPostcode: req.body.pharmPostcode,
        headPharmacist: req.body.headPharmacist,
        email: req.body.email 
    });

    //Save model to Database & response to client
    pharm = await pharm.save();
    res.send(`The details for ${pharm.name} have been successfully registered to the SecureScripts database.`)
});

//[3] READ (get) Route for Specific Doctor ID
router.get('/:id', async (req, res) => {
    const pharm = await Pharm.findById(req.params.id);
    if (!pharm) {
        res.status(404).send(`The pharmacy with an ID of ${req.params.id} does not exist.  Please ensure the pharmacy ID has been entered correctly.`)
    } else {
        res.send(pharm)
    };
});

//[4] UPDATE (put) Route for Specific Doctor ID
router.put('/:id', async (req, res) => {
    //Validation
    const {error} = validatePharm(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    } else {
        //Find ID and update data with body data
        const pharm = await Pharm.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                pharmStreetNumber: req.body.pharmStreetNumber,
                pharmStreetName: req.body.pharmStreetName,
                pharmCity: req.body.pharmCity,
                pharmState: req.body.pharmState,
                pharmPostcode: req.body.pharmPostcode,
                headPharmacist: req.body.headPharmacist,
                email: req.body.email
            }, {new:true});

        if(!pharm) {
            res.status(404).send(`The pharmacy with an ID of ${req.params.id} does not exist.  Please ensure the pharmacy ID has been entered correctly.`)
        } else {
            res.send(`The details for ${pharm.name} have been successfully updated!`)
        };
    };
});

//[5] DELETE (delete) Route for Specific Doctor ID
router.delete('/:id', async (req, res) => {
    //Find ID & run if/else statement based on ID passed into URL
    const pharm = await Pharm.findByIdAndRemove(req.params.id);

    if(!pharm) {
        res.status(404).send(`The pharmacy with an ID of ${req.params.id} does not exist.  Please ensure the pharmacy ID has been entered correctly.`)
    } else {
        res.send(`The details for ${pharm.name} has been successfully removed from the SecureScripts database.`)
    };
});

//Export module
module.exports = router;