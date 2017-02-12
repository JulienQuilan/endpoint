require('babel-core/register');

require.extensions['.txt'] = () => {};

module.exports = require('./main');
