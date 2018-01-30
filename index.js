// index.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const fortune = require('./lib/fortune.js')

// Express boilerplate
const app = express()
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
}))
app.use(express.static(__dirname + '/public'));
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
// End Express boilerplate

// set locals properties
app.use(function(req, res, next){
 res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
 next();
});

//COOKIE CODE
app.use(require('cookie-parser')());


//FORM HANDLING CODE
app.use(require('body-parser')());

app.use(require('./lib/routes.js'));

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
