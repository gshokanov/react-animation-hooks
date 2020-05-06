if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dist/cjs/react-animation-hooks-core');
} else {
  module.exports = require('./dist/cjs/react-animation-hooks-core.production.min');
}
