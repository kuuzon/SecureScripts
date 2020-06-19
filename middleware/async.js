//Middleware: Implements try-catches in each instance where rejected promises may occur (with async routes)
//Run through root routes server.js with NPM package "express-async-errors"
function asyncMiddleware(handle){
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch(ex) {
            next(ex)
        };
    };
};

module.exports = asyncMiddleware;