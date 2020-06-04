//Import packages
// const Joi = require('@hapi/joi');
// const config = require('config');
// const mongoose = require('mongoose');

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

//Connetion to MongoDB


//Middleware
//REMINDER: C.R.U.D. -- Create (POST), Read (GET), Update (PUT), Delete (DELETE)

//Init express application
app.use(express.json());

//[A] Route
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