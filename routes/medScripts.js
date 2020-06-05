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
    //Validation function called
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
    //Response sent to user
    res.send(`The script, ${medScript.name}, has been successfully recorded in the SecureScripts database.`)
});

//[3] UPDATE (put) Route


//[4] DELETE (delete) Route


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
