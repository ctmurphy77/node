var express = require('express');
var router = express.Router();
var mail = require('./mail.js');
const fortune = require('./fortune.js')

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

module.exports = router;
