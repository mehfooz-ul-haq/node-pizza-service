const {validationResult, check} = require('express-validator')

const validationRules = () => {
    return [
        check('name').not().isEmpty().withMessage('Name is required.'),
        check('email').isEmail().withMessage('Invalid email address.'),
        check('phone').not().isEmpty().isLength({min: 5}).withMessage('Invalid phone number.'),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const getErrors = []
    errors.array().map(err => getErrors.push({[err.param]: err.msg}))
    return res.status(422).json({errors: getErrors})
}

module.exports = {
    validationRules,
    validate,
}
