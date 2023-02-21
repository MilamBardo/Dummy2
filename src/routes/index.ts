
import * as express from 'express'
const expresssession = require('express-session');
//const Promise = require('es6-promise');

import * as blogRouter from "./blog";
import * as portfolioRouter from "./portfolio";
import * as uploadsRouter from "./uploads";
import * as adminRouter from "./admin";
import * as Users from '../models/Users/User';
import * as UserRepository from '../repositories/userRepository';

import * as PostRepository from '../repositories/postRepository';
import * as ImageRepository from '../repositories/imageRepository';
import * as Posts from '../models/Posts/PostsModule';

//import * as app from '../../app';


var router = express.Router();

router.use('/blog', blogRouter);
router.use('/portfolio', portfolioRouter);
router.use('/public/uploads', uploadsRouter);
router.use('/admin', adminRouter);
//var app = require('../../app');
//app.use(router);

type Next = () => void | Promise<void>;

router.use(function(req: any, res:any , next:Next) {

    // log each request to the console
    console.log(req.method, req.url);


    next(); 
});

// G E T S
router.get('/', (req:any, res:any) => {
  var userloggedin = false;
  if (req.session)
  {
    if (req.session.username)
    {
      userloggedin=true;
    }
  }

function checkReroutes(req : any, res : any)
{

}

res.render('index', { title: 'AlmosLataan Home', loggedin: userloggedin });
   
});

router.get('/register', function (req:any, res:any) {
  res.render('register');
});

router.get('/login', function (req:any, res:any) {
  res.render('login');
});

router.get('/sitemap', function (req:any, res:any) {;
  //res.header('Content-Type', 'text/xml');
  var path = require('path');
  res.sendFile(path.resolve(__dirname + '/../../public/sitemap.xml'));
  //res.render( 'sitemap' );
});

router.get('/contact', function (req:any, res:any) {
  var userloggedin = false;
  if (req.session)
  {
    if (req.session.username)
    {
      userloggedin =true;
      
    }
  }
  res.render('contact', { title: 'AlmosLataan Home', loggedin: userloggedin } );
});

router.get('/store', function (req:any, res:any) {
  var userloggedin = false;
  if (req.session)
  {
    if (req.session.username)
    {
      userloggedin =true;
    }
  }
  res.render('store', { title: 'AlmosLataan Home', loggedin: userloggedin });
});

// P O S T S
// router.post('/registerprocess', function(req, res, next) {
  router.post('/registerprocess', async (req:any, res:any, next: any) =>{

    if (req.body.email != req.body.confirmemail)
    {
      res.render('register', {alertmessage: "Problem when registering:  Emails don't match."});
    }
    else{

      try
      {

      
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

              let newUser = new Users.Users.User(req.body.username, hashedPassword, req.body.email)

              let usersRepos = new UserRepository.userRepository();
              
              let data = await usersRepos.add(newUser)
              return res.render('login', {alertmessage: "Registration successful"});
      }
      catch(err)
      {
                // This is never called
                res.render('register', {alertmessage: "Problem when registering, please try again. "});
      }
    }
  });

router.post('/login', async (req:any, res:any, next: any) =>{

  try
  {
    
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
    let data = await usersRepos.findany(suppliedusername)
    var bcrypt = require('bcrypt');

      if (data != null && !data.lockedout)
      {
          bcrypt.compare(suppliedpassword, data.encryptedpassword, function(err: Error, match: any) {
            // res == true
            if(err)
            {
              throw err;
            }

            if(match)
            {
                if (req.session) {
                    //req.session.user = suppliedusername
                    req.session['username'] = data.name;
                    req.session['userisadmin'] = data.isadmin;
                    res.render('index', { title: 'AlmosLataan Home', loggedin: true });
                }
                else {
                    res.render('login', {alertmessage: "Problem with logging in to session"});
                }
            }
            else
            {
              //Can't access class method - suspicion is that pg-promise isn't returning real objects
              //data.incrementloginattempts(); 
              //SO, TEMP FIX
              data.loginattempts++
              if (data.loginattempts > 3)
              {
                data.lockedout = true
              }
              //NOTICE NO PROMISE
              usersRepos.update(data);
              res.render('login', {alertmessage: "Login details don't match"});
            }
          });
      }
      else if(data == null)
      {
        res.render('login', {alertmessage: "Username or password not recognised. "});
      }
      else if(data.lockedout)
      {
        res.render('login', {alertmessage: "This account is locked out.  Please request unlock. "});
      }
      else
      {
        res.render('login', {alertmessage: "Login details not found"});
      }
  
  }
  catch (err)
  {
    res.render('login', {alertmessage: "Error when logging in.  Internal issue - please report"});
    //throw err;
  }
});

router.post('/logout', (req:any, res:any, next: any) =>{
  req.session.destroy(function (err: any) {
    if (err) return next(err)
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
  router.get('/:posttitle/', async(req:any, res:any) => {

    try
    {
      let loggedin = req.session.username == null ? false : true;
      let isadmin = req.session.userisadmin == null ? false : true;
      let title :string = req.params.posttitle;
      if (title != "favicon.ico")
      {
        //Get id from title
        let postid : string = "";
        for (var i of title)
        {
          if (i == "-") {
            postid = "";
          }
          else{
            postid += i;
          }
        }
        let suppliedpostid = +postid;

        let postRepos = new PostRepository.postRepository();
        let result: Posts.Post = await postRepos.getpostbyid(suppliedpostid)
        let post:Posts.Post;
        let imagedata  :any;
        let postadverts:any;
        
        post = result;

        imagedata = await postRepos.getpostimagesbypostid(suppliedpostid)
        
        postadverts = await postRepos.getpostadvertisementsforselect(suppliedpostid)

        let mainimage : any = null;
        let mainimagefilepath : any = null;
        if (imagedata != null && imagedata.length >0)
        {
            mainimage = imagedata[0];
            mainimagefilepath = "https://almoslataan.com/public/"+imagedata[0].imagefilepath;
            //mainimagefilepath = imagedata[0].imagefilepath;
        }
        //regeneratesitemap();
        let posturl : string = "https://almoslataan.com/"+post.posturl+"-"+postid;
        let fburl : string = "https%3A%2F%2Falmoslataan.com%2F"+post.posturl+"-"+postid;

        res.render('blog/viewpost', { title: post.posttitle, posturl: posturl, fburl : fburl, loggedin: loggedin, isadmin: isadmin, post: post, mainimage : mainimage, mainimagefilepath : mainimagefilepath, postadverts:postadverts });
      }
    }
    catch(err)
    {
          // This is never called
          //console.log('No posts due to error');
          res.render('blog/blog', { title: 'AlmosLataan Blog', alertmessage: 'Problem loading post.  Please contact if issue continues' });
     
          
    }
});

// router.get('/:posttitle/', (req, res) => {
//     let loggedin = req.session.username == null ? false : true;
//     let isadmin = req.session.userisadmin == null ? false : true;
//     let title :string = req.params.posttitle;

//     //Get id from title
//     let postid : string = "";
//     for (var i of title)
//     {
//       if (i == "-") {
//         postid = "";
//       }
//       else{
//         postid += i;
//       }
//     }
//     let suppliedpostid = +postid;

//     let postRepos = new PostRepository.postRepository();
//     const promise = new Promise.Promise((resolve : any, reject : any) => { resolve(postRepos.getpostbyid(suppliedpostid)); });
//     let post:Posts.Post;
//     promise.then((result  :Posts.Post) => {
//         post = result;

//         const promisePostImages = new Promise.Promise((resolve : any, reject : any) => { resolve(postRepos.getpostimagesbypostid(suppliedpostid)); });
//         promisePostImages.then((imagedata  :any) => {
//             let mainimage : any = null;
//             let mainimagefilepath : any = null;
//             if (imagedata != null && imagedata.length >0)
//                 {
//                     mainimage = imagedata[0];
//                     mainimagefilepath = "http://almoslataan.com/public/"+imagedata[0].imagefilepath;
//                     //mainimagefilepath = imagedata[0].imagefilepath;
//                 }
//             //regeneratesitemap();
//             let posturl : string = "https://almoslataan.com/"+post.posturl+"-"+postid;
//             let fburl : string = "https%3A%2F%2Falmoslataan.com%2F"+post.posturl+"-"+postid;
//             res.render('blog/viewpost', { title: post.posttitle, posturl: posturl, fburl : fburl, loggedin: loggedin, isadmin: isadmin, post: post, mainimage : mainimage, mainimagefilepath : mainimagefilepath });
//         });
//         promisePostImages.catch((err : any) => {
//             // This is never called
//             //console.log('No posts due to error');
//             res.render('blog/blog', { title: 'AlmosLataan Blog', alertmessage: 'Problem loading post.  Please contact if issue continues' + err.message + err.stack.toString });
//         });
//     });
//     promise.catch((err : any) => {
//         // This is never called
//         //console.log('No posts due to error');
//         res.render('blog/blog', { title: 'AlmosLataan Blog', alertmessage: 'Problem loading post.  Please contact if issue continues' + err.message + err.stack.toString });
//     });
// });

export = router;

