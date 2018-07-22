const ip = require('ip')
const colors = require('colors')

const config = {
  modules: process.env.npm_config_modules || 'demo',
  server: '/api',
  minimize: true,
  port: '8086',
  host: ip.address()
}

console.log(`>>> mode: ${process.env.NODE_ENV}`.green)
console.log(`>>> modules: ${config.modules}`.green)

module.exports = config
