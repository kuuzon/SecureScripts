//Import packages
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const config = require('config');

//Import route modules
const medScripts = require('./routes/medScripts');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const pharms = require('./routes/pharms');
const users = require('./routes/users');
const auth = require('./routes/auth');
// const developers = require('./routes/developers');

//Express Package
const express = require('express');
const app = express();

//Config Debug Test
//[ENV notes] to wipe ENV: unset jwtPrivateKey -- to see ENVs: printenv -- set new: export jwtPrivateKey=""
console.log('Config Test: ', config.message);
console.log('Config ENV Test: ', config.secretmessage);

//Web token environmental variable access to all routes
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    //Terminate Application
    process.exit(1);
};

//Connetion to mongoose
mongoose.connect('mongodb://localhost:37017/securescripts', { useNewUrlParser: true })
    .then( () => { console.log('connected...'); } )
    .catch( err => console.error('connection failed', err) );

//Middleware
//REMINDER: C.R.U.D. operations -- Create (POST), Read (GET), Update (PUT), Delete (DELETE)

//Init express application
app.use(express.json());

//[A] Home Route [READ]
app.get('/', (req, res) => {
    res.send('WELCOME TO SECURE SCRIPTS');
});

//[B] Imported Routes
app.use('/api/medscripts', medScripts);
app.use('/api/patients', patients);
app.use('/api/doctors', doctors);
app.use('/api/pharms', pharms);
app.use('/api/users', users);
app.use('/api/auth', auth);

//Additional Route [Documentation LIVE on site]
// app.use('/api/developers', developers);

//[B] Error Route
// app.use(error);

//Server PORT
const port = process.env.PORT || 5000
app.listen(5000, ()=> console.log(`Listening on port ${port}`));


//To do list:
//[4] Complete remainder route for error page / debugging
//[5] Add admin privledges
//[6] Design basic React frontend to house base GET route

//Addtional:
//[1] Add a expiry date validation on passing in script [IF TIME]
// --- Date of issue/expiry is on the script.  Need a validation for when it is passed in at the pharm. 
// --- Possibly new model (similar to rental one - this would solve data and stock issues) 

//[2] Add a "in stock function" - to pharm (See rental in example assignment)
// --- In stock: You would need a new model storing Medicine (stores all the meds that the scripts ref (need to change name structure there too - like ${medicine.name} Script)).  This model would be ref'd by the scripts and the pharm - pharm would then list the stocknumbers for these meds.

//[3] Add Documentation page (simple GET routes like ISS) for developers
//GET routes would be the medicine route and select parts of the doctor / pharmacy routes [admin privs]