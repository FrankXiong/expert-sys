var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var RuleSchema = new Schema({
	name: {
		type: String
	},
	premise: {
		type: Array
	},
	conclusion: {
		type: String,
		default: '无可奉告'
	},
	aname: {
		type: String
	},
	advise: {
		type: String,
		default: '无可奉告'
	},
	reliability: {
		type: Number,
		default: 1
	},
	// 规则阈值: 匹配度大于阈值，则该规则被激活
	threshold: {
		type: Number,
		default: 0.5
	},
	// 规则是否被激活
	actived: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: moment(new Date()).format('llll')
	},
	updated: {
		type: Date,
		default: moment(new Date()).format('llll')
	}
})

RuleSchema.statics = {
	deleteOne: function(id) {
		return this.remove({_id: id})
	}
}

var Rule = mongoose.model('Rule', RuleSchema);
var Promise = require('bluebird');
Promise.promisifyAll(Rule);
Promise.promisifyAll(Rule.prototype);

module.exports = Rule;
