var express = require('express');
var controller = require('./user.controller');
var auth = require('../auth');

var router = express.Router();

// router.get('/getUserList', auth.hasRole('admin'),controller.getUserList);
// router.post('/addUser', auth.hasRole('admin'),controller.addUser);
// router.delete('/:id', auth.hasRole('admin'),controller.destroy);
// router.put('/:id/updateUser', auth.hasRole('admin'), controller.updateUser);

//前台用户更新信息
router.get('/:uname', controller.getMe);
router.post('/login', controller.login)
router.post('/reg', controller.reg)
router.get('/list', auth.hasRole('admin'), controller.getUserList)

module.exports = router;
