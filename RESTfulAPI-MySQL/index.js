const express = require('express');
const app = express();
const router = require('./routes/user.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());                 //To support JSON-encoded bodies
app.use(bodyParser.urlencoded({             //To support URL-encoded bodies
    extended: false
}));

//Initialises and uses router
app.use(router);

//Root directory route
app.get("/", (req, res, next) => {
    res.send("Root Directory");
});

app.listen(3000, () => {
    console.log("The server is listening on port 3000...");
});