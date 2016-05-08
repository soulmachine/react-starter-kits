if (process.env.NODE_ENV === 'production') {
  module.exports = require('./DevTools.production') // eslint-disable-line
} else {
  module.exports = require('./DevTools.development') // eslint-disable-line
}
