var mongoose = require('mongoose');
var auth = require('../auth/');
var config = require('../../config/dev');
var _ = require('underscore');
var extract = require('../../core/extract');
var inference = require('../../core/inference');
var xss = require('xss');
var User = require('../../model/user');

exports.addStatus = function(req, res, next) {
	// pretend xss attack
	var inputStatus = xss(req.body.desc);
	var errorMsg;
	if (!inputStatus || inputStatus.length < 10 || inputStatus.length > 300) {
		errorMsg = '输入内容不合法';
	}
	if (errorMsg) {
		res.send({
			ok: true,
			data: words
		});
	} else {
		var words = extract.getKeywords(inputStatus);
		res.send({
			ok: true,
			data: words
		});
	}
}

exports.addFeature = function(req, res, next) {
	var inputFeature = req.body;
	var uid = req.cookies.uid;
	var errorMsg;
	var user = {
		uid: uid
	};
	var facts = Object.assign(user, inputFeature);
	var diagnosis;
	inference.diagnosis(facts).then(function(result) {
		console.log(result);
		diagnosis = Object.assign(inputFeature, result);
		return User.findOne({
			_id: result.uid
		});
	}).then(function(user) {
		diagnosis.created = new Date();
		var _user = Object.assign(user, user.historys.push(diagnosis));
		console.log(_user);
		return _user.save();
	}).then(function(user) {
		return res.send({
			ok: true,
			data: user
		});
	}).catch(function(err) {
		return res.send({
			ok: false,
			msg: err.message
		});
	});
}

exports.getResult = function(req, res, next) {
	var rid = req.params.rid;
	// TODO: query result db by rid
	res.send({
		ok: true,
		data: {
			type: '未知类型',
			conclusion: '无可奉告',
			advise: '江信江疑',
			reliability: '0.9'
		}
	});
}
