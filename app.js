"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
// import * as favicon from 'serve-favicon';
// import * as logger from 'morgan';
// import * as cookieParser = 'cookie-parser';
const bodyParser = require("body-parser");
//import * as session from 'express-session';
let app = express();
app.locals.moment = require('moment');
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use(express.static(__dirname + '/public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//LIVE conString: "postgres://nodeuser:Talanath5@127.0.0.1:5432/Almos";
var pg = require('pg'), session = require('express-session'), pgSession = require('connect-pg-simple')(session);
var PostgreSqlStore = require('connect-pg-simple')(session);
//var app = express();
var sessionOptions = {
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
    store: new PostgreSqlStore({
        conString: "postgres://Almos:Talanath5@localhost:5432/Almos"
    })
};
app.set('trust proxy', 1); //allows to pass proxy
app.use(session(sessionOptions));
const masterRouter = require("./src/routes/index");
//set-up all app.use()
app.use('/', masterRouter);
//app.listen(3000);
//LIVE app.listen(8080, '10.128.27.239')
// app.use(function (err, req, res, next) {
//   // handle error
// })
module.exports = app;
//# sourceMappingURL=app.js.map