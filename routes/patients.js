//Import middleware
const auth = require('../middleware/auth');

//Import schemas/validation
const {Patient, validatePatient} = require('../models/patient');
const {MedScript} = require('../models/medScript');
const {Doctor} = require('../models/doctor');
const {Pharm} = require('../models/pharm');

//Import express
const express = require('express');
const router = express.Router();

//Routes
//[1] READ (get) Route
router.get('/', auth, async (req, res) => {
    const patients = await Patient.find().sort('name');
    // console.log(Date.now());
    res.send(patients);
});

//[2] CREATE (post) Route
router.post('/', auth, async (req, res) => {
    //Validation
    const {error} = validatePatient(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check the MedScript ID is valid
    const medScript = await MedScript.findById(req.body.medScriptId);
    if (!medScript) return res.status(400).send('Invalid Script.  Please ensure you have entered the correct Script ID');

    //Check the Doctor ID is valid
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) return res.status(400).send('Invalid Doctor.  Please ensure you have entered the correct Doctor ID');

    //Check the Pharm ID is valid
    const pharm = await Pharm.findById(req.body.pharmId);
    if (!pharm) return res.status(400).send('Invalid requested Pharmacy.  Please ensure you have entered the correct Pharmacy ID');

    //Create new patient model + record post data to model variable
    let patient = new Patient({
        name: req.body.name,
        birthdate: req.body.birthdate,
        address: {
            streetNumber: req.body.address.streetNumber,
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            postcode: req.body.address.postcode
        },
        email: req.body.email,
        medScript: {
            _id: medScript._id,
            name: medScript.name
        },
        doctor: {
            _id: doctor._id,
            name: doctor.name
        },
        pharm: {
            _id: pharm._id,
            name: pharm.name
        }
    });
    // console.log(patient.address);

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
router.put('/:id', auth, async (req, res) => {
    //Validation
    const {error} = validatePatient(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check the MedScript ID is valid
    const medScript = await MedScript.findById(req.body.medScriptId);
    if (!medScript) return res.status(400).send('Invalid Script.  Please ensure you have entered the correct Script ID');

    //Check the Doctor ID is valid
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) return res.status(400).send('Invalid Doctor.  Please ensure you have entered the correct Doctor ID');

    //Check the Pharm ID is valid
    const pharm = await Pharm.findById(req.body.pharmId);
    if (!pharm) return res.status(400).send('Invalid requested Pharmacy.  Please ensure you have entered the correct Pharmacy ID');

    //Find ID & load in related data
    const patient = await Patient.findByIdAndUpdate(req.params.id, 
        //Updated data passed in
        {
            name: req.body.name,
            birthdate: req.body.birthdate,
            address: {
                streetNumber: req.body.address.streetNumber,
                street: req.body.address.street,
                city: req.body.address.city,
                state: req.body.address.state,
                postcode: req.body.address.postcode
            },
            email: req.body.email,
            medScript: {
                _id: medScript._id,
                name: medScript.name
            },
            doctor: {
                _id: doctor._id,
                name: doctor.name
            },
            pharm: {
                _id: pharm._id,
                name: pharm.name
            }
        }, {new: true});

    if(!patient) {
        res.status(404).send(`The patient with an ID of ${req.params.id} does not exist.  Please ensure the patient ID has been entered correctly.`)
    } else {
        res.send(`The details for ${patient.name} have been successfully updated!`)
    };
});

//[5] DELETE (delete) Route for Specific Patient ID
router.delete('/:id', auth, async (req, res) => {
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