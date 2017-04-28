var path = require('path');

module.exports = function(app) {
  app.use('/api/user', require('./api/user'));
  app.use('/api/rules', require('./api/rule'));
  app.use('/api/counsel', require('./api/counsel'));
  app.use('/api/feature', require('./api/feature'));
	app.use('/api/*', function (req,res,next) {
		return res.json({status:'success',msg:'请求API出错'});
	})
};
