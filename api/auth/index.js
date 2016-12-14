var mongoose = require('mongoose');
var config = require('../../config/index');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = mongoose.model('User');


/**
 * 验证token
 */
function authToken(credentialsRequired) {
	return compose()
		.use(function(req, res, next) {
			// TODO: Authorization
			next();
		})
		.use(expressJwt({
			secret: config.session.secret,
			credentialsRequired: credentialsRequired //是否抛出错误
		}))
}
/**
 * 验证用户是否登录
 */
function isAuthenticated() {
	return compose()
		.use(authToken(true))
		.use(function(err, req, res, next) {
			//expressJwt 错误处理中间件
			if (err.name === 'UnauthorizedError') {
				return res.status(401).send();
			}
			next();
		})
		.use(function(req, res, next) {
			User.findById(req.user._id, function(err, user) {
				if (err) return res.status(500).send();
				if (!user) return res.status(401).send();
				req.user = user;
				next();
			});
		});
}

/**
 * 验证用户权限
 */
function hasRole(roleRequired) {
	if (!roleRequired) throw new Error('Required role needs to be set');

	return compose()
		// .use(isAuthenticated())
		.use(function meetsRequirements(req, res, next) {
			console.log(req.headers.role);
			if (config.userRoles.indexOf(req.headers.role) >= 1) {
				next();
			} else {
				return res.status(403).send({
					ok: false,
					msg: '没有操作权限'
				});
			}
		});
}

/**
 * 生成token
 */
function signToken(id) {
	return jwt.sign({
		_id: id
	}, config.session.secret, {
		expiresIn: '1y'
	});
}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
exports.hasRole = hasRole;
