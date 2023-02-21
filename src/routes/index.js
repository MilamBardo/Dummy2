"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const expresssession = require('express-session');
//const Promise = require('es6-promise');
const blogRouter = require("./blog");
const portfolioRouter = require("./portfolio");
const uploadsRouter = require("./uploads");
const adminRouter = require("./admin");
const Users = require("../models/Users/User");
const UserRepository = require("../repositories/userRepository");
const PostRepository = require("../repositories/postRepository");
//import * as app from '../../app';
var router = express.Router();
router.use('/blog', blogRouter);
router.use('/portfolio', portfolioRouter);
router.use('/public/uploads', uploadsRouter);
router.use('/admin', adminRouter);
router.use(function (req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    next();
});
// G E T S
router.get('/', (req, res) => {
    var userloggedin = false;
    if (req.session) {
        if (req.session.username) {
            userloggedin = true;
        }
    }
    function checkReroutes(req, res) {
    }
    res.render('index', { title: 'AlmosLataan Home', loggedin: userloggedin });
});
router.get('/register', function (req, res) {
    res.render('register');
});
router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/sitemap', function (req, res) {
    ;
    //res.header('Content-Type', 'text/xml');
    var path = require('path');
    res.sendFile(path.resolve(__dirname + '/../../public/sitemap.xml'));
    //res.render( 'sitemap' );
});
router.get('/contact', function (req, res) {
    var userloggedin = false;
    if (req.session) {
        if (req.session.username) {
            userloggedin = true;
        }
    }
    res.render('contact', { title: 'AlmosLataan Home', loggedin: userloggedin });
});
router.get('/store', function (req, res) {
    var userloggedin = false;
    if (req.session) {
        if (req.session.username) {
            userloggedin = true;
        }
    }
    res.render('store', { title: 'AlmosLataan Home', loggedin: userloggedin });
});
// P O S T S
// router.post('/registerprocess', function(req, res, next) {
router.post('/registerprocess', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email != req.body.confirmemail) {
        res.render('register', { alertmessage: "Problem when registering:  Emails don't match." });
    }
    else {
        try {
            //MUST FIRST CHECK THAT USERNAME IS NOT BEING USED ALREADY
            var bcrypt = require('bcrypt');
            const saltRounds = 10;
            var salt = bcrypt.genSaltSync(saltRounds);
            var hashedPassword = bcrypt.hashSync(req.body.password, 10);
            // bcrypt.hash(req.body.password, 10, function(err:Error, hash:any) {
            //     // Store hash in your password DB.
            //       if (err)
            //       {
            //         throw err;
            //       }
            let newUser = new Users.Users.User(req.body.username, hashedPassword, req.body.email);
            let usersRepos = new UserRepository.userRepository();
            let data = yield usersRepos.add(newUser);
            return res.render('login', { alertmessage: "Registration successful" });
        }
        catch (err) {
            // This is never called
            res.render('register', { alertmessage: "Problem when registering, please try again. " });
        }
    }
}));
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   let gcapture = req.body['g-recaptcha-response'];
        //   let userIP = req.connection.remoteAddress;
        //   if(gcapture === undefined || gcapture === '' || gcapture === null) {
        //     res.render('login', {alertmessage: "Fail on capthcha not selected"});
        //   }
        // var secretKey = "	6LduwSgTAAAAAJniD0mhwtBc_8V1OHt2BI6z7TYJ";
        // var verificationUrl = "https://www.google.com/recaptcha/api/siteverify";
        // var request = require('request');
        // request.post(verificationUrl, {form: {secret: secretKey, response: gcapture, remoteip: userIP}}, function(error : any,response : any ,body : any) {
        //   body = JSON.parse(body);
        //   if(body.success !== undefined && !body.success) {
        //     res.render('login', {alertmessage: "Fail on request"});
        //   }
        let suppliedusername = req.body.user;
        let suppliedpassword = req.body.pass;
        let usersRepos = new UserRepository.userRepository();
        // const promise = new Promise.Promise((resolve :any , reject : any) => { resolve(usersRepos.findany(suppliedusername)); });
        let data = yield usersRepos.findany(suppliedusername);
        var bcrypt = require('bcrypt');
        if (data != null && !data.lockedout) {
            bcrypt.compare(suppliedpassword, data.encryptedpassword, function (err, match) {
                // res == true
                if (err) {
                    throw err;
                }
                if (match) {
                    if (req.session) {
                        //req.session.user = suppliedusername
                        req.session['username'] = data.name;
                        req.session['userisadmin'] = data.isadmin;
                        res.render('index', { title: 'AlmosLataan Home', loggedin: true });
                    }
                    else {
                        res.render('login', { alertmessage: "Problem with logging in to session" });
                    }
                }
                else {
                    //Can't access class method - suspicion is that pg-promise isn't returning real objects
                    //data.incrementloginattempts(); 
                    //SO, TEMP FIX
                    data.loginattempts++;
                    if (data.loginattempts > 3) {
                        data.lockedout = true;
                    }
                    //NOTICE NO PROMISE
                    usersRepos.update(data);
                    res.render('login', { alertmessage: "Login details don't match" });
                }
            });
        }
        else if (data == null) {
            res.render('login', { alertmessage: "Username or password not recognised. " });
        }
        else if (data.lockedout) {
            res.render('login', { alertmessage: "This account is locked out.  Please request unlock. " });
        }
        else {
            res.render('login', { alertmessage: "Login details not found" });
        }
    }
    catch (err) {
        res.render('login', { alertmessage: "Error when logging in.  Internal issue - please report" });
        //throw err;
    }
}));
router.post('/logout', (req, res, next) => {
    req.session.destroy(function (err) {
        if (err)
            return next(err);
        res.render('index', { title: 'AlmosLataan Home' });
    });
});
// router.get('/logout', function (req, res) {
//   req.session.destroy
//   // const promise = new Promise.Promise((resolve :any , reject : any) => { resolve(req.session.destroy)});
//   // promise.then((data:any) => {
//   //   res.render('index', { title: 'AlmosLataan Home' });
//   // });
// });
// Export the router
//Placing this method here rather than in blog router for the purposes of seo and shorter urls
router.get('/:posttitle/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let loggedin = req.session.username == null ? false : true;
        let isadmin = req.session.userisadmin == null ? false : true;
        let title = req.params.posttitle;
        if (title != "favicon.ico") {
            //Get id from title
            let postid = "";
            for (var i of title) {
                if (i == "-") {
                    postid = "";
                }
                else {
                    postid += i;
                }
            }
            let suppliedpostid = +postid;
            let postRepos = new PostRepository.postRepository();
            let result = yield postRepos.getpostbyid(suppliedpostid);
            let post;
            let imagedata;
            let postadverts;
            post = result;
            imagedata = yield postRepos.getpostimagesbypostid(suppliedpostid);
            postadverts = yield postRepos.getpostadvertisementsforselect(suppliedpostid);
            let mainimage = null;
            let mainimagefilepath = null;
            if (imagedata != null && imagedata.length > 0) {
                mainimage = imagedata[0];
                mainimagefilepath = "https://almoslataan.com/public/" + imagedata[0].imagefilepath;
                //mainimagefilepath = imagedata[0].imagefilepath;
            }
            //regeneratesitemap();
            let posturl = "https://almoslataan.com/" + post.posturl + "-" + postid;
            let fburl = "https%3A%2F%2Falmoslataan.com%2F" + post.posturl + "-" + postid;
            res.render('blog/viewpost', { title: post.posttitle, posturl: posturl, fburl: fburl, loggedin: loggedin, isadmin: isadmin, post: post, mainimage: mainimage, mainimagefilepath: mainimagefilepath, postadverts: postadverts });
        }
    }
    catch (err) {
        // This is never called
        //console.log('No posts due to error');
        res.render('blog/blog', { title: 'AlmosLataan Blog', alertmessage: 'Problem loading post.  Please contact if issue continues' });
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map