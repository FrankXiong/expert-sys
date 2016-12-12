var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var FeatureSchema = new Schema({
	type: {
		type: String
	},
	content: {
		type: String
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

FeatureSchema.statics = {
	deleteOne: function(id) {
		return this.remove({_id: id})
	}
}

var Feature = mongoose.model('Feature', FeatureSchema);
var Promise = require('bluebird');
Promise.promisifyAll(Feature);
Promise.promisifyAll(Feature.prototype);

module.exports = Feature;
