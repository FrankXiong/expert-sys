module.exports = {
  port: 3000,
  env: 'dev',
  mongo: {
    uri: 'mongodb://localhost/expert-sys'
  },
  session: {
    secret: 'expertsys'
  },
  //用户角色种类
  userRoles: ['user', 'admin'],
  cookie: {
    maxAge: 90000,
    domain: 'localhost'
  }
}
