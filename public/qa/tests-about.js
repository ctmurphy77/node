// CHAI ASSERT INDIVIDUAL PAGE TEST
var assert = require('chai').assert;

suite('"About" Page Tests', function(){
   test('page should contain link to contact page', function(){
     assert($('a[href="/contact"]').length);
  });
});
