const winston = require('winston');

// Configuración de winston
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
})

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500

    if (err.name === 'CastError') {
        statusCode = 400
        err.message = 'Resource not found'
    } else if (err.name === 'ValidationError') {
        statusCode = 400
        err.message = Object.values(err.errors).map(val => val.message).join(', ')
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401
        err.message = 'Invalid token'
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401
        err.message = 'Expired token'
    }

    if (process.env.NODE_ENV === 'production') {
        logger.error(err.message, { metadata: err.stack })
    }

    res.status(statusCode).json({
        mensaje: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}