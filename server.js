//Import packages
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
// const config = require('config');

//Express Package
const express = require('express');
const app = express();

//Import route modules
const medScripts = require('./routes/medScripts');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const pharms = require('./routes/pharms');
const users = require('./routes/users');
const auth = require('./routes/auth');

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
// app.use('/api/patients', patients);
// app.use('/api/doctors', doctors);
// app.use('/api/pharms', pharms);
// app.use('/api/users', users);
// app.use('/api/auth', auth);

//[B] Error Route



//Server PORT
const port = process.env.PORT || 5000
app.listen(5000, ()=> console.log(`Listening on port ${port}`));


//To do list:
//[1] Replicate medScript model + route to (a) doctors, (b) patients & (c) pharms
//[2] Implement hybrid schema database between medScripts, doctors, patients & pharms
//[3] Write user model & routes including auth.js route
//[4] Complete remainder route for error page
//[5] Add debugging processes & envs to project
//[6] Design basic React frontend to house base GET route

//Addtional:
//[1] Update medScript model: combine "date" and "expired" to a date validation schema (see medScript.js note)