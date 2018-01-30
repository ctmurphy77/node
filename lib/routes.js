var express = require('express');
var router = express.Router();
var mail = require('./mail.js');

router.get('/newsletter', function(req, res){
    res.render('newsletter', {
      csrf: 'CSRF token goes here'
    });
});

router.get('/thank-you', function(req, res){
    mail.sendMail('TESTING');
    res.render('thank-you');
});

router.get('/', (request, response) => {
  response.render('home', {
    user: 'Chris'
  })
})

router.get('/about', function(req, res) {
 res.render('about', {
   fortune: fortune.getFortune(),
   pageTestScript: '/qa/tests-about.js'
 } );
});

router.get('/nursery-rhyme', function(req, res) {
 res.render('nursery-rhyme');
});


router.post('/process', function(req, res){
  console.log('Form (from querystring): ' + req.query.form);
  console.log('CSRF token (from hidden form field): ' + req.body._csrf);
  console.log('Name (from visible form field): ' + req.body.name);
  console.log('Email (from visible form field): ' + req.body.email);
  res.redirect(303, '/thank-you');
});

module.exports = router;
