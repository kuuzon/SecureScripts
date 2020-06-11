//Import schemas/validation
const {Patient, validatePatient} = require('../models/patient');

//Import express
const express = require('express');
const router = express.Router();

//Routes
//[1] READ (get) Route
router.get('/', async (req, res) => {
    const patients = await Patient.find().sort('name');
    console.log(Date.now());
    res.send(patients);
});

//[2] CREATE (post) Route
router.post('/', async (req, res) => {
    //Validation
    const {error} = validatePatient(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Create new patient model + record post data to model variable
    let patient = new Patient({
        name: req.body.name,
        birthdate: req.body.birthdate,
        address: {
            streetNumber: req.body.streetNumber,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            postcode: req.body.postcode
        },
        email: req.body.email
    });

    //Save new model to database
    patient = await patient.save();
    //Response to client
    res.send(`${patient.name} has been successfully registered to the SecureScripts database.`)
});

//[3] READ (get) Route for Specific Patient ID
router.get('/:id', async (req, res) => {
    //Find and check ID passed into URL is valid
    const patient = await Patient.findById(req.params.id);
    if(!patient) {
        res.status(404).send(`The patient with an ID of ${req.params.id} does not exist.  Please ensure the patient ID has been entered correctly.`)
    } else {
        //Success response
        res.send(patient)
    };
});

//[4] UPDATE (put) Route for Specific Patient ID
router.put('/:id', async (req, res) => {
    //Validation
    const {error} = validatePatient(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Find ID & load in related data
    const patient = await Patient.findByIdAndUpdate(req.params.id, 
        //Updated data passed in
        {
            name: req.body.name,
            birthdate: req.body.birthdate,
            address: {
                streetNumber: req.body.streetNumber,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                postcode: req.body.postcode
            },
            email: req.body.email 
        }, {new: true});
    
    if(!patient) {
        res.status(404).send(`The patient with an ID of ${req.params.id} does not exist.  Please ensure the patient ID has been entered correctly.`)
    } else {
        res.send(`The personal details for ${patient.name} have been successfully updated!`)
    };
});

//[5] DELETE (delete) Route for Specific Patient ID
router.delete('/:id', async (req, res) => {
    //Find ID & run if/else based on passed in ID
    const patient = await Patient.findOneAndRemove(req.params.id);

    if(!patient) {
        res.status(404).send(`The patient with an ID of ${req.params.id} does not exist.  Please ensure the patient ID has been entered correctly.`)
    } else {
        //Response to client
        res.send(`The patient, ${patient.name} has been successfully removed from the SecureScripts database.`)
    };
});

//Export module
module.exports = router;