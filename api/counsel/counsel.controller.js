var mongoose = require('mongoose');
var auth = require('../auth/');
var config = require('../../config/dev');
var _ = require('underscore');
var extract = require('../../core/extract');
var inference = require('../../core/inference');
var xss = require('xss');

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
	var errorMsg;
	var facts = {};
	if (!(inputFeature.behaviour && inputFeature.emotion && inputFeature.body && inputFeature.habit)) {
		errorMsg = '输入参数不完整';
	}
	if (errorMsg) {
		res.status(422).send({
			ok: false,
			msg: errorMsg
		});
	} else {
		// test...
		facts.name = 'aaa';
		facts.emotion = 'dispoint';
		facts.action = 'alone';
		facts.habit = 'insomnia';
		inference.diagnosis(facts).then(function(result) {
			res.send({
				ok: true,
				data: result
			});
		});
	}
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
	})
}
