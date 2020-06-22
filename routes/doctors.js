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
router.post('/', async (req, res) => {
    //Validation
    const {error} = validateDoctor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Create new doctor model + record post data
    let doctor = new Doctor({
        name: req.body.name,
        clinicName: req.body.clinicName,
        clinicStreetNumber: req.body.clinicStreetNumber,
        clinicStreetName: req.body.clinicStreetName,
        clinicCity: req.body.clinicCity,
        clinicState: req.body.clinicState,
        clinicPostcode: req.body.clinicPostcode,
        email: req.body.email
    });

    //Save model to database & response to client
    doctor = await doctor.save();
    res.send(`The details for Dr ${doctor.name} have been successfully registered to the SecureScripts database.`)
});

//[3] READ (get) Route for Specific Doctor ID
router.get('/:id', async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if(!doctor) {
        res.status(404).send(`The doctor with an ID of ${req.params.id} does not exist.  Please ensure the doctor ID has been entered correctly.`)
    } else {
        res.send(doctor)
    };
});

//[4] UPDATE (put) Route for Specific Doctor ID
router.put('/:id', async (req, res) => {
    //Validation
    const {error} = validateDoctor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Find ID and update data with body data
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            clinicName: req.body.clinicName,
            clinicStreetNumber: req.body.clinicStreetNumber,
            clinicStreetName: req.body.clinicStreetName,
            clinicCity: req.body.clinicCity,
            clinicState: req.body.clinicState,
            clinicPostcode: req.body.clinicPostcode,
            email: req.body.email
        }, {new: true});
    
    if(!doctor) {
        res.status(404).send(`The doctor with an ID of ${req.params.id} does not exist.  Please ensure the doctor ID has been entered correctly.`)
    } else {
        res.send(`The details for Dr ${doctor.name} have been successfully updated!`)
    };
});

//[5] DELETE (delete) Route for Specific Doctor ID
router.delete('/:id', async (req, res) => {
    //Find ID & run if/else statement based on ID in URL
    const doctor = await Doctor.findByIdAndRemove(req.params.id);

    if(!doctor) {
        res.status(404).send(`The doctor with an ID of ${req.params.id} does not exist.  Please ensure the doctor ID has been entered correctly.`)
    } else {
        res.send(`The doctor, Dr ${doctor.name} has been successfully removed from the SecureScripts database.`)
    };
});

//Export module
module.exports = router;