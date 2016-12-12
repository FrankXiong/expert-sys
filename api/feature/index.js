var express = require('express');
var controller = require('./feature.controller');
var auth = require('../auth');

var router = express.Router();

router.post('/add', auth.hasRole('admin'), controller.addFeature)
router.get('/list', controller.getAllFeatures)
router.delete('/delete', auth.hasRole('admin'), controller.deleteFeature)

module.exports = router;
