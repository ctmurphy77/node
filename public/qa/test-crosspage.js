var Browser = require('zombie'), assert = require('chai').assert;
var browser; // declared here to make Global

// ZOMBIE BROWSER TEST

// get browser to run tests
suite('Cross-Page Tests', function(){
 setup(function(){
 browser = new Browser();
 });

 // check that referrer is properly registered when linked from hood-river page
 test('requesting a group rate quote from the hood river tour page' +
   'should populate the referrer field', function(done){
   var referrer = 'http://localhost:3000/tours/hood-river';
   browser.visit(referrer, function(){
     browser.clickLink('.requestGroupRate', function(){
       assert(browser.field('referrer').value === referrer);
       done();
     });
   });
 });

 // check that referrer is properly registered when linked from oregon-coast page
 test('requesting a group rate from the oregon coast tour page should ' +
  'populate the referrer field', function(done){
    var referrer = 'http://localhost:3000/tours/oregon-coast';
    browser.visit(referrer, function(){
      browser.clickLink('.requestGroupRate', function(){
       assert(browser.field('referrer').value === referrer);
       done();
      });
    });
 });

// check that referrer is empty registered when visited directly
test('visiting the "request group rate" page dirctly should result ' +
  'in an empty referrer field', function(done){
    browser.visit('http://localhost:3000/tours/request-group-rate',
      function(){
        assert(browser.field('referrer').value === '');
        done();
      });
    });
});
