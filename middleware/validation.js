const { ValidationError } = require('../utils/errors');

const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;

    if (!name || typeof name !== 'string') {
        return next(new ValidationError('Name is required and must be a string'));
    }

    if (!description || typeof description !== 'string') {
        return next(new ValidationError('Description is required and must be a string'));
    }

    if (typeof price !== 'number' || price < 0) {
        return next(new ValidationError('Price must be a positive number'));
    }

    if (!category || typeof category !== 'string') {
        return next(new ValidationError('Category is required and must be a string'));
    }

    if (typeof inStock !== 'boolean') {
        return next(new ValidationError('inStock must be a boolean (true/false)'));
    }

    next();
};

module.exports = { validateProduct };
