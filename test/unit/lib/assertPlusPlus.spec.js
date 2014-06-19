var app    = require('../../../lib/assertPlusPlus');
var assert = require('assert');

describe('assertPlusPlus', function () {
  describe('endsWith()', function () {
    it('should not throw exception', function () {
      var threw = false;
      var result;

      try {
        result = app.endsWith('foobar', 'bar');
      } catch (e) {
        threw = true;
      }

      assert.equal(threw, false);
    });

    it('should throw exception', function () {
      var threw = false;
      var result;

      try {
        result = app.endsWith('foobard', 'bar');
      } catch (e) {
        threw = true;
      }

      assert.equal(threw, true);
    });
  });

  describe('true()', function () {
    it('should not throw exception', function () {
      var threw = false;
      var result;

      try {
        result = app.true(true);
      } catch (e) {
        threw = true;
      }

      assert.equal(threw, false);
    });

    it('should throw exception', function () {
      var threw = false;
      var result;

      try {
        result = app.true(false);
      } catch (e) {
        threw = true;
      }

      assert.equal(threw, true);
    });
  });

  describe('false()', function () {
    it('should not throw exception', function () {
      var threw = false;
      var result;

      try {
        result = app.false(false);
      } catch (e) {
        threw = true;
      }

      assert.equal(threw, false);
    });

    it('should throw exception', function () {
      var threw = false;
      var result;

      try {
        result = app.false(true);
      } catch (e) {
        threw = true;
      }

      assert.equal(threw, true);
    });
  });
});
