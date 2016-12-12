var mongoose = require('mongoose');
var Rule = require('../../model/rule');
var auth = require('../auth/');
var config = require('../../config/dev');
var _ = require('underscore');

exports.addRule = function(req, res, next) {
	var newRule = req.body || {};
	var error_msg;
	if (!newRule.premise) {
		error_msg = '请输入前提';
	} else if (!newRule.conclusion) {
		error_msg = '请输入结论';
	} else if (!newRule.threshold) {
		error_msg = '请输入规则阈值';
	} else if (!newRule.reliability) {
		error_msg = '请输入规则可信度';
	}
	if (error_msg) {
		res.status(422).send({
			ok: false,
			msg: error_msg
		});
	} else {
		var _rule = new Rule(newRule);
		_rule.save().then(function(data) {
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
