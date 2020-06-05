//Import packages
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();

//Fake data [Replaced by Model DB entries]
const medScripts = [
    {
        id: 1,
        name: 'Panadol',
        quantity: 3,
        repeats: 3,
        expired: false
    },
    {
        id: 2,
        name: 'Mylanta',
        quantity: 5,
        repeats: 1,
        expired: false
    },
    {
        id: 3,
        name: 'Nexium',
        quantity: 2,
        repeats: 2,
        expired: false
    }
];

//Routes
//[1] READ (get) Route
router.get('/', (req, res) => {
    res.send(medScripts);
});

//[2] CREATE (post) Route
router.post('/', (req, res) => {
    //Validation function
    const {error} = validateMedScript(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Posted data recorded to variable
    const medScript = {
        id: medScripts.length + 1,
        name: req.body.name,
        quantity: req.body.quantity,
        repeats: req.body.repeats,
        expired: req.body.expired
    };
    //Data pushed to end of database array
    medScripts.push(medScript);
    //Response sent to the client
    res.send(`The script, ${medScript.name}, has been successfully recorded in the SecureScripts database.`)
});

//[3] READ (get) Route for Specific ID
router.get('/:id', (req, res) => {
    //Find the Id & related data
    let medScript = medScripts.find(m => m.id === parseInt(req.params.id));
    if(!medScript) {
        res.status(404).send('The script ID does not exist.')
    } else {
        res.send(medScript)
    };
});

//[4] UPDATE (put) Route for Specific ID
router.put('/:id', (req, res) => {
    //Validation function
    const {error} = validateMedScript(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Find the Id & load in related data
    let medScript = medScripts.find(m => m.id === parseInt(req.params.id));
    if(!medScript) {
        res.status(404).send('The script ID does not exist.')
    } else {
        //Update the data
        medScript.name = req.body.name;
        medScript.quantity = req.body.quantity;
        medScript.repeats = req.body.repeats;
        medScript.expired = req.body.expired;

        //Response back to the client
        res.send(`The script has been successfully updated as follows: 
            Name: ${medScript.name}, 
            Quantity: ${medScript.quantity},
            Repeats: ${medScript.repeats}, 
            Expired: ${medScript.expired},`
        )
    }
});

//[4] DELETE (delete) Route
router.delete('/:id', (req, res) => {
    //Find the Id & load in related data
    let medScript = medScripts.find(m => m.id === parseInt(req.params.id));
    if(!medScript) {
        res.status(404).send('The script ID does not exist.')
    } else {
        //Get the index of the course 
        const index = medScripts.indexOf(medScript);
        //Delete the Script from Array
        medScripts.splice(index, 1);
        //Response back to client with deleted Script
        res.send(`The script (ID: ${medScript.id}) which prescribed the medication, ${medScript.name}, has been deleted from the SecureScripts database.`)
    }
});

//Validation Schema
function validateMedScript(medScript){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        quantity: Joi.number().integer().min(1).max(200).required(),
        repeats: Joi.number().integer().min(1).max(12).required(),
        expired: Joi.boolean().truthy('yes').falsy('no').sensitive().required()
    });
    return schema.validate(medScript);
};

//Export module
module.exports = router;

//Iteration notes: 
//Ensure the schema includes the FK for: [patientId, doctorId and pharmId]
//Change "expired" to "date" and structure validation to ensure the date is not expired 
