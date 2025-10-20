const { AppError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  // If error is not an AppError
    if (!(err instanceof AppError)) {
        console.error('Unexpected Error:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }

  // operational error
    res.status(err.statusCode).json({
        status: 'fail',
        message: err.message,
    });
};

module.exports = errorHandler;
