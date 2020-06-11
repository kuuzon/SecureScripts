//Import schemas/validation
const {MedScript, validateMedScript} = require('../models/medScript');

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

    //Create new medScript model & record posted data to model variable
    let medScript = new MedScript({
        name: req.body.name,
        quantity: req.body.quantity,
        repeats: req.body.repeats,
        date: req.body.date,
        expired: req.body.expired
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
    
    //Find the Id & load in related data
    const medScript = await MedScript.findByIdAndUpdate(req.params.id,
        //Data being updated
        {
            name: req.body.name,
            quantity: req.body.quantity,
            repeats: req.body.repeats,
            expired: req.body.expired
        }, {new: true});
    
    if(!medScript) {
        res.status(404).send('The script ID does not exist.')
    } else {
        //Response back to the client
        res.send(`The script has been successfully updated as follows: 
            Name: ${medScript.name}, 
            Quantity: ${medScript.quantity},
            Repeats: ${medScript.repeats},
            Date: ${medScript.date},
            Expired: ${medScript.expired},`
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

