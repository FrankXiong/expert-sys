var mongoose = require('mongoose');
var Rule = require('../../model/rule');
var auth = require('../auth/');
var config = require('../../config/index');
var _ = require('underscore');
var compiler = require('../../core/compiler');

exports.addRule = function(req, res, next) {
	var newRule = req.body || {};
	var errorMsg;
	if (!newRule.premise) {
		errorMsg = '请输入前提';
	} else if (!newRule.conclusion) {
		errorMsg = '请输入结论';
	} else if (!newRule.advise) {
		errorMsg = '请输入建议';
	} else if (!newRule.threshold) {
		errorMsg = '请输入规则阈值';
	} else if (!newRule.reliability) {
		errorMsg = '请输入规则可信度';
	}
	if (errorMsg) {
		res.status(422).send({
			ok: false,
			msg: errorMsg
		});
	} else {
		var _rule = new Rule(newRule);
		console.log(_rule);
		_rule.save().then(function(data) {
			compiler.run(data, function(res) {
				console.log('compile success');
			}, function() {
				console.log('compile fail');
			});
		}).then(function(data) {
			res.send({
				ok: true,
				data: data
			});
		}).catch(function(err) {
			res.status(500).send({
				ok: false,
				msg: err.message
			});
		})
	}
}

exports.updateRule = function(req, res, next) {
	var newRule = req.body;
	res.send({
		ok: true,
		msg: 'update rule'
	});
}

exports.deleteRule = function(req, res, next) {
	var rid = req.params.id;
	Rule.deleteOne(rid).then(function(data) {
		res.send({
			ok: true,
			data: data
		});
	}).catch(function(err) {
		res.status(500).send({
			ok: false,
			msg: err.message
		});
	});
}

exports.getAllRules = function(req, res, next) {
	// WARNING: there should have requested paging params
	Rule.find({}).then(function(data) {
		res.send({
			ok: true,
			data: {
				list: data,
				total: data.length
			}
		});
	}).catch(function(err) {
		res.status(500).send(err)
	})
}
