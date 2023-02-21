/// <reference path="../models/Users/User.ts" />
//import * as Users from require("User");

var express = require('express');
var router = express.Router();

/* P O S T S */

/* action login. */
router.post('/login', function(req, res, next) {
    
  res.render('login', { title: 'AlmosLataan Login' });
});

router.post('/register', function(req, res, next) {
    
  res.render('register', { title: 'Register' });
});

router.post('/registerprocess', function(req, res, next) {
    console.log(req.body.user)
    console.log(req.body.pass)
    var Users = require('../models/Users/User');
    // var users = require('./models/Users/Users');
        // var users = require('Users');
    //var users = require('../../models/Users/User.ts');
    var newUser = new Users.Users(req.body.user, req.body.pass)
    var usersRepos = require('./repositories/userRepository');
    var r = usersReposs
    
  res.render('register', { title: 'Register' });
});

/* P A G E  R E Q U E S T S */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AlmosLataan Home' });
});

router.get('/register', function (req, res) {
  res.render('register');
});

router.get('/blog', function (req, res) {
  res.render('blog');
});

router.get('/store', function (req, res) {
  res.render('store');
});

router.get('/contact', function (req, res) {
  res.render('contact');
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
