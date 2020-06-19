//Import error package
const winston = require('winston');
require('winston-mongodb');

//New Winston logger object (parameter is just setting the options)
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'SecureScripts' },
    transports: [
        //Send errors here:
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        //Send warnings here:
        new winston.transports.File({ filename: 'logs/warnings.log', level: 'warn' }),
        //Send all infos here:
        new winston.transports.File({ filename: 'logs/combined.log' }),
        //Save errors to MongoDB:
        new winston.transports.MongoDB({ db: 'mongodb://localhost:37017/securescripts' })
    ]
});

//Log express errors
function error(err, req, res, next){
    logger.error(err.message, err);
    res.status(500).send('Something failed...');
    process.exit(1);
};

//Log uncaught sync exception:
//Errors occurring OUTSIDE error middleware in server.js (GENERALLY - failing NPM package)
process.on('uncaughtException', (ex) => {
    console.log('An uncaught exception occurred...');
    logger.error(ex.message, ex);
    process.exit(1);
});

//Log unhandled rejections:
//Errors occuring OUTSIDE express code at NODE level
process.on('unhandledRejection', (ex) => {
    console.log('An uncaught rejection occurred...');
    logger.error(ex.message, ex);
});

module.exports = error;