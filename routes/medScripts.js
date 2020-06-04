const express = require('express');
const router = express.Router();

//Fake data [Replaced by Model]
const medScripts = [
    {
        id: 1,
        name: 'Panadol',
        quantity: 3,
        repeats: 3,
        patientId: 'Josh',
        pharmId: 'CW Malvern',
        doctorId: 'GP Allen Toorak'
    },
    {
        id: 2,
        name: 'Mylanta',
        quantity: 5,
        repeats: 1,
        patientId: 'Andrew',
        pharmId: 'CW Toorak',
        doctorId: 'GP Davis Glen Waverley'
    },
    {
        id: 3,
        name: 'Nexium',
        quantity: 2,
        repeats: 2,
        patientId: 'Dave',
        pharmId: 'CW Armadale',
        doctorId: 'GP Allen Toorak'
    }
];

//Routes
//[1] READ (get) Route
router.get('/', (req, res) => {
    res.send(medScripts);
});

//Export module
module.exports = router;