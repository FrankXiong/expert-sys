var mongoose = require('mongoose');
var _ = require('underscore');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	uname: String,
	pass: String,
	sex: String,
	age: Number,
	role: {
		type: String,
		default: 'user'
	},
	historys: {
		type: Array
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

UserSchema
	.virtual('token')
	.get(function() {
		return this._id;
	});

// UserSchema.pre('save',function(next){
//     var user = this
//     if(this.isNew){
//       this.meta.createAt = this.meta.updateAt = Date.now()
//     }else{
//       this.meta.updateAt = Date.now()
//     }
//     if(user.password){
//       user.password = hash
//       next()
//     }
// });

UserSchema.methods = {
	hasRole: function(role) {
		var selfRole = this.role;
		return (selfRole.indexOf('admin') !== -1 || selfRole.indexOf(role) !== -1);
	},
	comparePass: function(text) {
		return text === this.pass;
	}
}

// 静态方法
UserSchema.statics = {
	findByName: function(uname){
    return this.findOne({uname: uname});
  }
}

UserSchema.set('token', {
	virtuals: true
});

var User = mongoose.model('User', UserSchema);
var Promise = require('bluebird');
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

module.exports = User;
