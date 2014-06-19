var fs   = require('fs');
var path = require('path');

module.exports = {
  /**
   * Require lib module to test
   * @param {string} modulePath - path to module, relative to project lib directory
   */
  r: function () {
    var args = Array.prototype.slice.call(arguments, 0);

    args.unshift(__dirname, '..', '..', 'lib');

    return require(path.resolve.apply(path, args);
  },

  /**
   * Get path
   */
  path: function () {
    var args = Array.prototype.slice.call(arguments, 0);

    args.unshift(__dirname, '..');

    return path.resolve.apply(path, args);
  },

  /**
   * Get textual contents of a fixture file
   */
  fixture: function () {
    var args = Array.prototype.slice.call(arguments, 0);
    var filename;

    args.unshift(__dirname, '..', 'fixtures');
    filename = path.resolve.apply(this, args);

    return fs.readFileSync(filename, 'utf-8');
  },

  /**
   * Assert module
   */
  assert: require('./customAssert')
};
