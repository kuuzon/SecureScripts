const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//SETUP POOL: MySQL only has a limited no. of connections to the DB - Pool allows us to recycle connections (more efficient) 
const pool = mysql.createPool({ 
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_usersAPI',
    port: 8889
})

//Est connection to DB (passing in JS object into "connection") (Made into a parent function as we need to call it everytime we need to connect to the DB)
function getConnection(){
    return pool;
}

//ROUTE: Passes in static users content [SUPERSEDED]
// app.get("/users", (req, res, next) => {
//     let user1 = {firstName: "Tom", lastName: "Black"};
//     let user2 = {firstName: "Jen", lastName: "Green"};
//     let user3 = {firstName: "Amy", lastName: "Blue"};
//     res.json([user1, user2, user3]);
// });

//ROUTE: Passes in user content dynamically from DB
router.get("/users", (req, res, next) => {
    
    const connection = getConnection();

    const queryString = "SELECT * FROM users";
    connection.query(queryString, (err, rows, fields) =>{
        if(err){
            res.send(`Something is wrong ${err}`);
            next(new Error(`Something is wrong ${err}`));
        }
        res.json(rows);                 //Send all users back in json as result
    })
});

//GET ROUTE: Allow us to receive USER information from the Database
router.get('/users/:id', (req, res, next) => {
    
    const connection = getConnection();
    
    const userID = req.params.id;
    console.log(userID);

    //Create a variable that stores mySQL statement
    const queryString = "SELECT * FROM users WHERE id=?";  //* = all  || ? will soon = userID
    connection.query(queryString, [userID], (err, rows, fields) => {   //[userID] swapped into the "?"
        if(err){
            res.send(`Something is wrong ${err}`);
            next(new Error(`Something is wrong ${err}`));
        }
        //Successful response NEEDS to exclude user ID number from the array outputted on the client (security risk)
        const users = rows.map((fields) => {
            return {firstName: fields.first_name, lastName: fields.last_name};
        })
        
        //Return the reworked data into the client
        res.json(users);
    })
});

//POST ROUTE: Allow us to POST data to the database
router.post('/user_create', (req, res, next) =>{
    
    const connection = getConnection();

    const queryString = "INSERT INTO users (first_Name, last_Name) VALUES (?,?)"
    console.log(req.body);                              //Allows us to see what data is being passed to this route
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    // res.send(`Details ${firstName} ${lastName}`);       //Not saving to DB, just sending data back to them

    //POST and save data to DB
    connection.query(queryString, [firstName, lastName], (err, results, fields) => {      //firstName replaces ?, lastName repl ?
        //Error check
        if(err){
            res.send(`Failed to insert new user: ${err}`);
            res.sendStatus(500);
            next(new Error(`Failed to insert new user: ${err}`));
        }
        //Response
        res.send(`Inserted a new user with id: ${results.insertId}`);
    }); 
});

module.exports = router;