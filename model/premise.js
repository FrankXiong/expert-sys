var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PremiseSchema = new Schema({
	uid: {
		type: String,
	},
	premise: {
		type: Array
	},
	reliability: {
		type: Number,
		default: 1
	},
	desc: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
})

var Premise = mongoose.model('Premise', PremiseSchema);
var Promise = require('bluebird');
Promise.promisifyAll(Premise);
Promise.promisifyAll(Premise.prototype);

module.exports = Premise;
