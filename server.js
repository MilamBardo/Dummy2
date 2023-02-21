/// <reference path='./typings/index.d.ts'/>
"use strict";
var path = require('path');
var express = require('express');
// import * as favicon from 'serve-favicon';
// import * as logger from 'morgan';
// import * as cookieParser = 'cookie-parser';
// import * as  bodyParser = 'body-parser';
var app = express();
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use(express.static(__dirname + '/public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var HomeController = require('./src/routes/index/');
var homeCon = new HomeController();
homeCon.Register(app);
app.listen(3001);
//# sourceMappingURL=server.js.map