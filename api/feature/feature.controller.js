var mongoose = require('mongoose');
var Feature = require('../../model/feature');
var auth = require('../auth/');
var config = require('../../config/dev');
var _ = require('underscore');

exports.addFeature = function(req, res, next) {
	var new_feature = req.body || {};
	var error_msg;
	if (!new_feature.type) {
		error_msg = '请选择一个特征类型';
	} else if (!new_feature.content) {
		error_msg = '请输入特征内容';
	}
	if (error_msg) {
		res.status(422).send({
			ok: false,
			msg: error_msg
		});
	} else {
		var _feature = new Feature(new_feature);
		_feature.save().then(function(data) {
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
}

exports.updateFeature = function(req, res, next) {
	var newFeature = req.body;
	res.send({
		ok: true,
		msg: 'update feature'
	});
}

exports.deleteFeature = function(req, res, next) {
	var rid = req.query.id;
	Feature.deleteOne(rid).then(function(data) {
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

exports.getAllFeatures = function(req, res, next) {
	var features = []
	for (var i = 0; i < 4; i++) {
		features[i] = new Array();
	}
	// ugly code...
	Feature.find({}).then(function(data) {
		data.forEach(function(item) {
			switch (item.type) {
				case 'emotion':
					features[0].push(item);
					break;
				case 'body':
					features[1].push(item);
					break;
				case 'behaviour':
					features[2].push(item);
					break;
				case 'habit':
					features[3].push(item);
					break;
				default:
					return;
			}
		})
		res.send({
			ok: true,
			data: features
		});
	}).catch(function(err) {
		res.status(500).send(err)
	});

}