var index  = require('../../../lib');
var assert = require('assert');
var path   = require('path');

describe('help-me-test', function () {
  var h;

  beforeEach(function () {
    h = index(__dirname, '..', '..');
  });

  describe('injectGlobal()', function () {
    it('should use default global key', function () {
      h.injectGlobal();

      assert.equal(typeof hmt.testRoot, 'string');
    });

    it('should use custom global key', function () {
      h.injectGlobal('tmh');

      assert.equal(typeof tmh.testRoot, 'string');
    });
  });

  describe('starting state', function () {
    it('should have the correct test root', function () {
      var expected = path.resolve(__dirname, '..', '..');
      var actual   = h.testRoot;

      assert.equal(actual, expected);
    });

    it('should have the correct mocks root', function () {
      var expected = path.resolve(__dirname, '..', '..', 'mocks');
      var actual   = h.mocksRoot;

      assert.equal(actual, expected);
    });

    it('should have the correct fixtures root', function () {
      var expected = path.resolve(__dirname, '..', '..', 'fixtures');
      var actual   = h.fixturesRoot;

      assert.equal(actual, expected);
    });
  });

  describe('#module()', function () {
    beforeEach(function () {
      h.testRoot = path.resolve(__dirname, '..', '..', 'fixtures', 'fake_test_root');
      h.projectRoot = path.resolve(h.testRoot, '..');
    });

    it('should have the correct path', function () {
      assert.strictEqual(h.module('lib', 'one'), 1);
    });
  });

  describe('#lib()', function () {
    beforeEach(function () {
      h.testRoot = path.resolve(__dirname, '..', '..', 'fixtures', 'fake_test_root');
    });

    it('should require the correct child module', function () {
      assert.strictEqual(h.lib('one'), 1);
    });

    it('should require the correct descendant module', function () {
      assert.strictEqual(h.lib('sub', 'two')(), 2);
    });
  });

  describe('#proxy()', function () {
    beforeEach(function () {
      h.testRoot = path.resolve(__dirname, '..', '..', 'fixtures', 'fake_test_root');
    });

    it('should require the correct child module', function () {
      assert.strictEqual(h.proxy('one')(), 1);
    });

    it('should require the correct descendant module', function () {
      assert.strictEqual(h.proxy('sub', 'two')()(), 2);
    });

    it('should require the correct child module with the correct mock', function () {
      var module = h.proxy('sub', 'three')({ 'fs': 45 });
      assert.strictEqual(module.myFs, 45);
    });
  });

  describe('#mock()', function () {
    it('should require the correct child module', function () {
      assert.strictEqual(h.mock('mock'), 333);
    });

    it('should require the correct descendant module', function () {
      assert.strictEqual(h.mock('sub', 'ery'), 999);
    });
  });

  describe('#fixture()', function () {
    it('should read the correct child file', function () {
      assert.strictEqual(h.fixture('foo.sh'), 'abracadabra\n');
    });

    it('should read the correct descendent file', function () {
      assert.strictEqual(h.fixture('fixer', 'upper.txt'), 'obo\n');
    });
  });

  describe('#path()', function () {
    it('should build the correct path', function () {
      assert.equal(h.path('foo'), path.resolve(__dirname, '..', '..', 'foo'));
    });
  });

  describe('#assert()', function () {
    it('should be a function', function () {
      assert.equal(typeof h.assert, 'function');
    });
  });

  describe('#spy()', function () {
    it('should be a functional sinon spy', function () {
      var spy = h.spy();

      spy();

      assert.equal(spy.callCount, 1);
    });
  });
});
