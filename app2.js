var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var routes = require('./src/routes/index');
// var users = require('./routes/users');


// var pg = require('pg');
// var pghstore = require('pg-hstore');
// var Sequelize = require('sequelize');

var app = express();

// var message = 'Dog biter';
// console.log(message);
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// var connectionString = 'postgres://localhost/booktown';

// pg.connect(connectionString, onConnect);

// function onConnect(err, client, done) {
//   //Err - This means something went wrong connecting to the database.
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   //For now let's end client
//   client.end();
// }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

//classes


//functions

//app.get('/', function(req, res){
  //res.send('hello world dog');
//});


//-- P R O M I S E S  W I R E U P --//




//app.listen(3001);

// var http = require('http');
// 
// var birds = require('./routes/index.js');
// app.use('/index', birds);
// http.createServer(function (request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello, My World!\n');
// 
// }).listen(80, "127.0.0.1");
