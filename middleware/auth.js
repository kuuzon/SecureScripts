//Import packages
const config = require('config');
const jwt = require('jsonwebtoken');

//Middleware for Verifying Token
function auth(req, res, next){
    //Token data stored in header passed into "token"
    const token = req.header('x-auth-token');

    //If no token exists under the name "x-auth-token", route access is denied
    if(!token){
        return res.status(401).send('Access Denied.  No token provided.  Please log in to access this page.');

    //If token exists, decode the token and pass to next middleware
    } try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    
    //Throw an "exception" if the token, whilst being present in the header, is not valid
    } catch(ex) {
        res.status(400).send('Invalid Token.');
    };
};

module.exports = auth;