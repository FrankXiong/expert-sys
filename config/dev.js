module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV,
  mongo: {
    uri: 'mongodb://localhost/expert-sys'
  },
  session: {
    secret: 'expertsys'
  },
  //用户角色种类
  userRoles: ['user', 'admin']
}
