// index.js
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const http = require('http')

//set env params
require('dotenv').config({path: './lib/config.env'})

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

//LOGGING
switch(app.get('env')){
   case 'development':
     // compact, colorful dev logging
     app.use(require('morgan')('dev'));
     break;
   case 'production':
     // module 'express-logger' supports daily log rotation
     app.use(require('express-logger')({
     path: __dirname + '/log/requests.log'
     }));
     break;
}

//COOKIE CODE
var session = require('client-sessions');

app.use(function(req,res,next){
  var cluster = require('cluster');
  if(cluster.isWorker) console.log('Worker %d received request', cluster.worker.id);
});

app.use(session({
  cookieName: 'session',
  secret: process.env.COOKIE_SECRET,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//FORM HANDLING CODE
app.use(require('body-parser')());

//ROUTING
app.use(require('./lib/routes.js'));

// 500 error handler (middleware)
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
 res.status(404);
 res.render('404');
});

function startServer() {
 http.createServer(app).listen(process.env.PORT, function(){
 console.log( 'Express started in ' + app.get('env') +
 ' mode on http://localhost:' + process.env.PORT +
 '; press Ctrl-C to terminate.' );
 });
}

if(require.main === module){
 // application run directly; start app server
 startServer();
} else {
 // application imported as a module via "require": export function
 // to create server
 module.exports = startServer;
}
