var mongoose = require('mongoose');
var User = require('../../model/user');
var auth = require('../auth/');
var config = require('../../config/dev')

exports.getMe = function(req, res) {
	var uid = req.params.uid;
	User.findById(uid).then(function(user) {
		return res.status(200).send({
			ok: true,
			data: user
		});
	}).catch(function(err) {
		return res.status(500).send(err);
	});
}

//前台用户更新自己信息
exports.updateMe = function(req, res, next) {
	var uname = req.body.uname ? req.body.uname.replace(/(^\s+)|(\s+$)/g, "") : '';
	var NICKNAME_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
	var errorMsg;
	if (uname === '') {
		errorMsg = '呢称不能为空';
	} else if (uname.length <= 2 || uname.length > 15 || !NICKNAME_REGEXP.test(uname)) {
		errorMsg = '用户名不合法';
	}
	if (errorMsg) {
		return res.status(422).send({
			msg: errorMsg
		});
	}

	var user = req.user;
	user.uname = uname;
	user.save().then(function(result) {
		return res.status(200).json({
			success: true,
			data: result.userInfo
		});
	}).catch(function(err) {
		if (err.errors.uname) {
			err = {
				error: err.errors.uname.message
			}
		}
		return res.status(500).send(err);
	});

}

exports.login = function(req, res, next) {
	var uname = req.body.uname;
	var pass = req.body.pass;
	var errorMsg;
	if (uname === '') {
		errorMsg = '用户名不能为空';
	} else if (pass === '') {
		errorMsg = '密码不能为空';
	}
	if (errorMsg) {
		//HTTP code 422: Unprocessable Entity
		return res.status(422).send({
			ok: false,
			msg: errorMsg
		});
	}
	User.findOne({
		uname: uname
	}).then(function(user) {
		console.log(user);
		var valid = user.comparePass(pass);
		if (!valid) {
			res.status(422).send({
				ok: false,
				msg: '密码错误'
			});
		} else {
			var token = auth.signToken();
			var data = {
				user: user,
				token: token
			};
			console.log(data);
			res.send({
				ok: true,
				msg: '',
				data: data
			});
		}
	}).catch(function(err) {
		console.log('ERROR: ' + err);
		res.status(500).send({
			ok: false,
			msg: err
		});
	})
}

exports.reg = function(req, res, next) {
	var newUser = req.body;
	var uname = req.body.uname ? req.body.uname.replace(/(^\s+)|(\s+$)/g, "") : '';
	newUser.uname = uname;
	var sex = req.body.sex;
	var age = parseInt(req.body.age, 10);
	var pass = req.body.pass;
	var NICKNAME_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
	var errorMsg;
	if (!uname) {
		errorMsg = "用户名不能为空";
	} else if (!pass) {
		errorMsg = '密码不能为空';
	} else if (!sex) {
		errorMsg = "性别不能为空";
	} else if (!age) {
		errorMsg = '年龄不能为空';
	} else if (uname.length <= 2 || uname.length > 15 || !NICKNAME_REGEXP.test(uname)) {
		errorMsg = "用户名不合法";
	} else if (age < 1 || age > 120) {
		errorMsg = "年龄不合法";
	} else if (pass.length < 6) {
		errorMsg = '密码不得短于6位';
	}
	if (errorMsg) {
		return res.status(422).send({
			ok: false,
			msg: errorMsg
		});
	}
	User.findOne({
		uname: uname
	}).then(function(user) {
		if (user) {
			console.log('ERROR: ' + '用户名已存在');
			res.send({
				ok: false,
				msg: '该用户名已存在'
			});
		} else {
			User.create(newUser).then(function(user) {
				if (user) {
					res.send({
						ok: true,
						msg: '注册成功',
						user: user
					});
				}
			}).catch(function(err) {
				console.log('ERROR:' + err);
				res.status(500).send({
					ok: false,
					msg: '服务器出了点问题...'
				});
			})
		}
	}).catch(function(err) {
		console.log('ERROR: ' + err);
		res.status(500).send({
			ok: false,
			msg: error
		});
	})
}

exports.getUserList = function(req, res, next) {
	// TODO: req must contains paging params
	User.find({}).then(function(users) {
		res.send({
			ok: true,
			data: users
		});
	}).catch(function(err) {
		console.log('ERROR: ' + err);
		res.send({
			ok: false,
			msg: err
		});
	})
}
