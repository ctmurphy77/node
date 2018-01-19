// index.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')

// Express boilerplate
const app = express()
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
// End Express boilerplate

app.use(express.static(__dirname + '/public'));

//test
app.use(function(req, res, next){
 res.locals.showTests = app.get('env') !== 'production' &&
 req.query.test === '1';
 next();
});

app.get('/', (request, response) => {
  response.render('home', {
    name: 'Chris'
  })
})

app.get('/about', function(req, res) {
 res.render('about', {
   fortune: fortune.getFortune(),
   pageTestScript: '/qa/tests-about.js'
 } );
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
 res.status(404);
 res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500');
});




app.listen(3000);
