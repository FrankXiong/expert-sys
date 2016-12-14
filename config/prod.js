module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV,
  mongo: {
    uri: 'mongodb://121.42.189.247/expert-sys'
  },
  session: {
    secret: 'expertsys'
  },
  //用户角色种类
  userRoles: ['user', 'admin'],
  cookie: {
    maxAge: 90000,
    domain: '121.42.189.247'
  }
}
