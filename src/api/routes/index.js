const router = require('express').Router()

router.get('/', function(req, res, next) {
  res.status(200)
  res.send('pong!')
});

router.use('/orders', require('./orderRoutes'))

module.exports = router;
