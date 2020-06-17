//Import schemas/validation
const {MedScript, validateMedScript} = require('../models/medScript');
const {Doctor} = require('../models/doctor');

//Import express
const express = require('express');
const router = express.Router();

//Routes
//[1] READ (get) Route
router.get('/', async (req, res) => {
    const medScripts = await MedScript.find().sort('name');
    res.send(medScripts);
});

//[2] CREATE (post) Route
router.post('/', async (req, res) => {
    //Validation function
    const {error} = validateMedScript(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check the Doctor ID is valid
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) return res.status(400).send('Invalid Doctor.  Please ensure you have entered the correct Doctor ID');

    //Create new medScript model & record posted data to model variable
    let medScript = new MedScript({
        name: req.body.name,
        quantity: req.body.quantity,
        repeats: req.body.repeats,
        issueDate: req.body.issueDate,
        expiryDate: req.body.expiryDate,
        doctor: {
            _id: doctor._id,
            name: doctor.name
        }
    });
    //Save new model to the database
    medScript = await medScript.save();
    //Response sent to the client
    res.send(`The script, ${medScript.name}, has been successfully recorded in the SecureScripts database.`)
});

//[3] READ (get) Route for Specific ID
router.get('/:id', async (req, res) => {
    //Find the Id & related data
    const medScript = await MedScript.findById(req.params.id);
    if(!medScript) {
        res.status(404).send('The script ID does not exist.')
    } else {
        res.send(medScript)
    };
});

//[4] UPDATE (put) Route for Specific ID
router.put('/:id', async (req, res) => {
    //Validation function
    const {error} = validateMedScript(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Check the Doctor ID is valid
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) return res.status(400).send('Invalid Doctor.  Please ensure you have entered the correct Doctor ID');

    //Find the Id & load in related data
    const medScript = await MedScript.findByIdAndUpdate(req.params.id,
        //Data being updated 
        //(DATE should never be updatable as this would encourage manipulation of script issue date)
        {
            name: req.body.name,
            quantity: req.body.quantity,
            repeats: req.body.repeats,
            doctor: {
                _id: doctor._id,
                name: doctor.name
            }
        }, {new: true});
    
    if(!medScript) {
        res.status(404).send('The script ID does not exist.')
    } else {
        //Response back to the client
        res.send(`The script has been successfully updated as follows: 
            Name: ${medScript.name}, 
            Quantity: ${medScript.quantity},
            Repeats: ${medScript.repeats},
            Issue Date: ${medScript.issueDate},
            Expiry Date: ${medScript.expiryDate},
            Issuing Doctor: ${doctor.name}`
        );
    }
});

//[4] DELETE (delete) Route
router.delete('/:id', async (req, res) => {
    //Find the Id & load in related data
    const medScript = await MedScript.findByIdAndRemove(req.params.id);

    if(!medScript) {
        res.status(404).send('The script ID does not exist.')
    } else {
        //Response back to client with deleted Script
        res.send(`The script (ID: ${medScript.id}) which prescribed the medication, ${medScript.name}, has been deleted from the SecureScripts database.`)
    }
});

//Export module
module.exports = router;