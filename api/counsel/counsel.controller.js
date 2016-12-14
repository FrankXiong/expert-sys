var mongoose = require('mongoose');
var auth = require('../auth/');
var config = require('../../config/index');
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
	var uname = req.cookies.uname;
	var errorMsg;
	var user = {
		name: uname
	};
	var facts = Object.assign(user, inputFeature);
	var diagnosis;
	inference.diagnosis(facts).then(function(result) {
		console.log(result);
		return res.send({
			ok: true,
			data: result
		});
	});
	// inference.diagnosis(facts).then(function(result) {
	// 	diagnosis = Object.assign(inputFeature, result);
	// 	return User.findOne({
	// 		uname: result.uname
	// 	});
	// }).then(function(user) {
	// 	diagnosis.created = new Date();
	// 	var _user = Object.assign(user, user.historys.push(diagnosis));
	// 	return _user.save();
	// }).then(function(user) {
	// 	return res.send({
	// 		ok: true,
	// 		data: user
	// 	});
	// }).catch(function(err) {
	// 	return res.send({
	// 		ok: false,
	// 		msg: err.message
	// 	});
	// });
}

exports.getResult = function(req, res, next) {
	var uname = req.params.uname;
	console.log(uname);
	// TODO: query result db by rid
	if (uname) {
		User.findByName(uname).then(function(user) {
			if (user && user.historys) {
				res.send({
					ok: true,
					data: user.historys.pop()
				});
			} else {
				res.status(401).send({
					ok: false,
					msg: 'this user is not in db'
				});
			}
		}).catch(function(err) {
			res.status(500).send({
				ok: false,
				msg: err.message
			});
		});
	} else {
		res.status(422).send({
			ok: false,
			msg: 'missing request params'
		});
	}
}
