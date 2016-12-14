var express = require('express');
var controller = require('./counsel.controller');
var auth = require('../auth');

var router = express.Router();

router.post('/feature', controller.addFeature);
router.post('/status', controller.addStatus);
router.get('/:uname', controller.getResult);

module.exports = router;
