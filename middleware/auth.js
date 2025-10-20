const { AUthError } = require('../utils/errors');

const auth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return next(new AuthError('API key is missing'));
    }

    if (apiKey !== process.env.API_KEY) {
        return next(new AuthError('Invalid API key'));
        }

    next();
};

module.exports = auth;
