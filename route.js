var path = require('path');

module.exports = function(app) {
  app.use('/user', require('./api/user'));
  app.use('/rules', require('./api/rule'));
  app.use('/counsel', require('./api/counsel'));
  app.use('/feature', require('./api/feature'));
	app.use('/*', function (req,res,next) {
		return res.json({status:'success',msg:'请求API出错'});
	})
};
