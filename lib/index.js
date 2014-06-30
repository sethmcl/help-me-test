var path       = require('path');
var fs         = require('fs');
var sinon      = require('sinon');
var proxyquire = require('proxyquire');

module.exports = function () {
  var args     = Array.prototype.slice.call(arguments, 0);
  var testRoot = path.resolve.apply(path, args);

  var api = {
    /**
     * Inject in to global scope
     * @param {string} key - global key name
     */
    injectGlobal: function (key) {
      global[key || 'hmt'] = api;
    },

    /**
     * @property {string} root test directory
     * @default
     */
    testRoot: testRoot,

    /**
     * @property {string} root fixtures directory
     * @default
     */
    fixturesRoot: path.resolve(testRoot, 'fixtures'),

    /**
     * @property {string} root mocks directory
     * @default
     */
    mocksRoot: path.resolve(testRoot, 'mocks'),

    /**
     * Require lib module to test
     * @param {string} modulePath - path to module, relative to project lib directory
     */
    lib: function () {
      var args = Array.prototype.slice.call(arguments, 0);

      args.unshift(this.testRoot, '..', 'lib');

      return require(path.resolve.apply(path, args));
    },

    /**
     * Use proxyquire to require a module with mocks
     * @param {string} modulePath - path to module, relative to project lib directory
     * @returns {function}
     */
    proxy: function () {
      var args = Array.prototype.slice.call(arguments, 0);
      var modulePath;

      args.unshift(this.testRoot, '..', 'lib');
      modulePath = path.resolve.apply(path, args);

      return function (modulePath, mocks) {
        return proxyquire(modulePath, mocks || {});
      }.bind(null, modulePath);
    },

    /**
     * Require mock module
     * @param {string} modulePath - path to module, relative to test mocks directory
     */
    mock: function () {
      var args = Array.prototype.slice.call(arguments, 0);

      args.unshift(this.mocksRoot);

      return require(path.resolve.apply(path, args));
    },

    /**
     * Get textual contents of a fixture file
     */
    fixture: function () {
      var args = Array.prototype.slice.call(arguments, 0);
      var filename;

      args.unshift(this.testRoot, 'fixtures');
      filename = path.resolve.apply(this, args);

      return fs.readFileSync(filename, 'utf-8');
    },

    /**
     * Get path
     */
    path: function () {
      var args = Array.prototype.slice.call(arguments, 0);

      args.unshift(this.testRoot);

      return path.resolve.apply(path, args);
    },

    /**
     * @property {object} assert
     * @default
     */
    assert: require('./assertPlusPlus'),

    /**
     * @property {function} Sinon.spy
     * @default
     */
    spy: sinon.spy.bind(sinon)
  };

  return api;
};
