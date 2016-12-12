var express = require('express');
var controller = require('./rule.controller');
var auth = require('../auth');

var router = express.Router();

router.post('/add', auth.hasRole('admin'), controller.addRule)
router.get('/all', auth.hasRole('admin'), controller.getAllRules)
router.put('/update', auth.hasRole('admin'), controller.updateRule)
router.delete('/delete/:id', auth.hasRole('admin'), controller.deleteRule)

module.exports = router;
