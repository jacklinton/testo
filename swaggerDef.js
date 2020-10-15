const { version } = require('./package.json')

module.exports = {
  info: {
    title: 'Testo API',
    version,
    description: 'API resources for the Testo API',
  },
  host: 'localhost',
  basePath: '/',
}
