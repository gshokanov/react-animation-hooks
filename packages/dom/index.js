if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dist/cjs/react-animation-hooks-dom');
} else {
  module.exports = require('./dist/cjs/react-animation-hooks-dom.production.min');
}
