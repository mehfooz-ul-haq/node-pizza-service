const router = require('express').Router();

const {validationRules, validate} = require('../validations/newOrderValidation')
const {processNewOrder} = require('../controllers/ordersController')

router.get('/',
    function (req, res, next) {
        res.status(200)
        res.send('List of orders')
    });

router.post('/', validationRules(), validate, processNewOrder);

module.exports = router;
