var express = require('express');
var router = express.Router();
var mail = require('./mail.js');
const fortune = require('./fortune.js')

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

router.get('/newsletter', function(req, res){
    res.render('newsletter', {
        csrf: 'CSRF token goes here',
        name: req.session.user
    });
});

router.get('/thank-you', function(req, res){
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

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/process', function(req, res){
    var name = req.body.name || '', email = req.body.email || '';
    /* input validation
    if(!email.match(VALID_EMAIL_REGEX))
    return res.next(new Error('Invalid email address.')); */

    res.render('email/thank-you',
    { layout: null, cart: "TEST" }, function(err,html){
        if( err ) console.log('error in email template');
        mail.sendMail(html, email);
    });
    req.session.user = req.body.name;
    res.redirect(303, '/thank-you');
});

router.post('/register',[
    check('email')
    // Every validator method in the validator lib is available as a
    // method in the check() APIs.
    // You can customize per validator messages with .withMessage()
    .isEmail().withMessage('must be an email')
    // Every sanitizer method in the validator lib is available as well!
    .trim()
    .normalizeEmail(),
    // ...or throw your own errors using validators created with .custom()
    /*.custom(value => {
      return findUserByEmail(value).then(user => {
        throw new Error('this email is already in use');
      })
  }),*/
  // General error messages can be given as a 2nd argument in the check APIs
  check('password', 'passwords must be at least 5 chars long and contain one number')
    .isLength({ min: 5 })
    .matches(/\d/)
], function(req, res){
    var username = req.body.username || '', email = req.body.email || '', password = req.body.password || '', confirm = req.body.confirm || '';
    /* input validation
    if(!email.match(VALID_EMAIL_REGEX))
    return res.next(new Error('Invalid email address.')); */
    // Get the validation result whenever you want; see the Validation Result API for all options!
  const errors = validationResult(req);
  if (!errors.isEmpty() || password != confirm) {
    return res.status(200).json({ errors: errors.mapped() });
  }
    req.session.user = username;
    res.locals.user = req.session.user;
    res.redirect(303, '/success');
});

module.exports = router;
