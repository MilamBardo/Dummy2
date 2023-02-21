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
const PostRepository = require("../repositories/postRepository");
const ImageRepository = require("../repositories/imageRepository");
const AdvertisementRepository = require("../repositories/advertisementRepository");
const Posts = require("../models/Posts/PostsModule");
const Ads = require("../models/Advertisements/AdvertisementsModule");
const expresssession = require('express-session');
//const Promise = require('es6-promise');
let router = express.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield displayBlog(req, res, new Date(), true);
    }
    catch (err) {
        throw new Error("caught an error");
    }
}));
router.get('/getnextpage/:startdate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var startdate = new Date(req.params.startdate);
        yield displayBlog(req, res, startdate, true);
    }
    catch (err) {
        throw new Error("caught an error");
    }
}));
router.get('/getpreviouspage/:previousstartdate/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var startdate = new Date(req.params.previousstartdate);
        yield displayBlog(req, res, startdate, false);
    }
    catch (err) {
        throw new Error("caught an error");
    }
}));
//reoutes needed
router.get('/:posttitle/:postnumber/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    let title = req.params.posttitle;
    let postnumber = req.params.postnumber;
    if (title = "viewpost") {
        let suppliedpostid = +postnumber;
        let postRepos = new PostRepository.postRepository();
        let post = yield postRepos.getpostbyid(suppliedpostid);
        let imagedata = yield postRepos.getpostimagesbypostid(suppliedpostid);
        if (imagedata) {
            let mainimage = null;
            let mainimagefilepath = null;
            if (imagedata != null && imagedata.length > 0) {
                mainimage = imagedata[0];
                mainimagefilepath = "http://almoslataan.com/public/" + imagedata[0].imagefilepath;
                //mainimagefilepath = imagedata[0].imagefilepath;
            }
            res.render('blog/viewpost', { title: post.posttitle, loggedin: loggedin, isadmin: isadmin, post: post, mainimage: mainimage, mainimagefilepath: mainimagefilepath });
        }
    }
}));
router.get('/addpost', (req, res) => {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    res.render('blog/addpost', { title: 'AlmosLataan Add New Post', loggedin: loggedin, isadmin: isadmin });
});
router.get('/editpost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.username && req.session.userisadmin) {
        let suppliedpostid = req.query.postid;
        let postRepos = new PostRepository.postRepository();
        let imageRepos = new ImageRepository.imageRepository();
        let adsRepos = new AdvertisementRepository.advertisementRepository();
        //This format is due to curretn typescript problems with promise.all.
        let result = yield postRepos.getpostbyid(suppliedpostid);
        let postimages;
        let post;
        let images;
        let adtypes;
        let adverts;
        let postadverts;
        try {
            post = result;
            if (postimages == null || postimages.length == 0) {
                postimages = null;
            }
            let result2 = yield imageRepos.getimagesbypostid(suppliedpostid);
            postimages = result2;
            let result3 = yield imageRepos.getallimages();
            images = result3;
            adtypes = yield adsRepos.getalladvertisementtypes();
            adverts = yield adsRepos.getalladvertisements();
            postadverts = yield postRepos.getpostadvertisementsforselect(suppliedpostid);
            res.render('blog/editpost', { title: 'AlmosLataan Edit Post', loggedin: true, isadmin: true, post: post, postimages: postimages, portfolioimages: images, adverttypes: adtypes, adverts: adverts, postadverts: postadverts });
        }
        catch (err) {
            yield displayBlog(req, res, null, true);
        }
    }
}));
// router.get('/editpost', (req, res) => {
//     if (req.session.username && req.session.userisadmin)
//     {
//         let suppliedpostid = req.query.postid;
//         let postRepos = new PostRepository.postRepository();
//         const promise = new Promise.Promise((resolve:any, reject:any) => { resolve(postRepos.getpostbyid(suppliedpostid)); });
//         promise.then((post:Posts.Post) => {
//             let imageRepos = new ImageRepository.imageRepository();
//                 const promise2 = new Promise.Promise((resolve:any, reject:any) => { resolve(imageRepos.getimagesbypostid(suppliedpostid)); });
//                 promise2.then((postimages:any) => { 
//                     const promise3 = new Promise.Promise((resolve:any, reject:any) => { resolve(imageRepos.getallimages()); });
//                     promise3.then((images:any) => {
//                         if (postimages == null || postimages.length == 0) postimages=null;
//                         res.render('blog/editpost', { title: 'AlmosLataan Edit Post', loggedin: true, isadmin: true, post: post, postimages: postimages, portfolioimages: images});
//                     });
//                     promise3.catch((err : any) => {
//                         displayBlog(req, res);
//                     });
//                 });
//                 promise2.catch((err : any) => {
//                     displayBlog(req, res);
//             });
//         });
//         promise.catch((err : any) => {
//             displayBlog(req, res);
//         });
//     }
// });
router.post('/editpost', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let suppliedpostid = req.body.postid;
    let suppliedposttitle = req.body.posttitle;
    let suppliedposrexcerpt = req.body.postexcerpt;
    let suppliedpostbody = req.body.postbody;
    let associatedpostimageid = req.body.associatedpostimage;
    let currentpostimageid = req.body.currentpostimage;
    let imagecaption = req.body.imagecaption;
    let postRepos = new PostRepository.postRepository();
    let post = yield postRepos.getpostbyid(suppliedpostid);
    //TEMP while we figure out how to use classes properly
    post.setPostTitle(suppliedposttitle);
    post.postbody = suppliedpostbody;
    post.postexcerpt = suppliedposrexcerpt;
    //UPDATE POST
    yield postRepos.updatepost(post);
    //NOW FOR IMAGE
    //if already exists and now null -> update as deleted
    //if already exists and now changed -> update imageid
    //if does not already exist, insert
    if (currentpostimageid != null) {
        if (associatedpostimageid == null || associatedpostimageid == "none") {
            // DELETE
            yield postRepos.deletepostimage(currentpostimageid);
            yield regeneratesitemap();
            var newdate = new Date();
            yield displayBlog(req, res, newdate, true);
        }
        else {
            let fetchedpostimage = yield postRepos.getpostimagebypostimageid(currentpostimageid);
            //change
            fetchedpostimage.imageid = associatedpostimageid;
            fetchedpostimage.postimagecaption = imagecaption;
            //Now UPDATE
            yield postRepos.updatepostimage(fetchedpostimage);
            yield regeneratesitemap();
            var newdate = new Date();
            yield displayBlog(req, res, newdate, true);
        }
    }
    else if (associatedpostimageid != "none") {
        //INsert Post IMage
        let postimagenew = new Posts.PostImage(suppliedpostid, associatedpostimageid);
        postimagenew.postimagecaption = imagecaption;
        yield postRepos.addpostimage(postimagenew);
        yield regeneratesitemap();
        var newdate = new Date();
        displayBlog(req, res, newdate, true);
    }
    else {
        yield regeneratesitemap();
        var newdate = new Date();
        yield displayBlog(req, res, newdate, true);
    }
}));
router.post('/addpost', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let suppliedposttitle = req.body.posttitle;
    let suppliedpostexcerpt = req.body.postexcerpt;
    let suppliedpostbody = req.body.postbody;
    let newPost = new Posts.Post(suppliedposttitle, suppliedpostbody, suppliedpostexcerpt);
    let postRepos = new PostRepository.postRepository();
    yield postRepos.add(newPost);
    yield regeneratesitemap();
    var newdate = new Date();
    yield displayBlog(req, res, newdate, true);
}));
//JSON methods
router.post('/addAdvert', (req, res) => {
    try {
        if (req.body) {
            let advertname = req.body[0].advertname;
            let adverthtml = req.body[0].adverthtml;
            let adverttype = req.body[0].adverttype;
            let advert = new Ads.Advertisement(advertname, adverthtml, adverttype);
            let adRepos = new AdvertisementRepository.advertisementRepository();
            let result = adRepos.addadvertisement(advert);
            //might be null
            let success = false;
            if (result != null && result.advertisementid > 0)
                success = true;
            if (success) {
                advert.advertisementid = result.advertisementid;
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify(advert));
            }
            else {
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify("advert addition was a failue"));
            }
        }
    }
    catch (e) {
        //should really log first;
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let errorstring = e.message;
        res.end(JSON.stringify("error when adding amazonad" + errorstring));
    }
});
router.post('/addAdvertToPost', (req, res) => {
    try {
        if (req.body) {
            let postid = req.body[0].postid;
            let advertid = req.body[0].advertid;
            let position = req.body[0].position;
            let postadvert = new Posts.PostAdvertisement(postid, advertid, position);
            let postRepos = new PostRepository.postRepository();
            let result = postRepos.addpostadvertisement(postadvert);
            //might be null
            let success = false;
            if (result != null && result.advertisementid > 0)
                success = true;
            if (success) {
                postadvert.postadvertisementid = result.postadvertisementid;
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify(postadvert));
            }
            else {
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify("postadvert addition was a failue"));
            }
        }
    }
    catch (e) {
        //should really log first;
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let errorstring = e.message;
        res.end(JSON.stringify("error when adding postadvert" + errorstring));
    }
});
router.post('/addAdvertToPost', (req, res) => {
    try {
        if (req.body) {
            let postid = req.body[0].postid;
            let advertid = req.body[0].postid;
            let position = req.body[0].position;
            let postadvert = new Posts.PostAdvertisement(postid, advertid, position);
        }
    }
    catch (e) {
        //should really log first;
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let errorstring = e.message;
        res.end(JSON.stringify("error when adding advert to post" + errorstring));
    }
});
///Will fetch blog entries and render
function displayBlog(req, res, startdate, greaterthanstartdate) {
    return __awaiter(this, void 0, void 0, function* () {
        let loggedin = req.session.username == null ? false : true;
        let isadmin = req.session.userisadmin == null ? false : true;
        let postRepos = new PostRepository.postRepository();
        if (greaterthanstartdate) {
            startdate.setSeconds(startdate.getSeconds() + 1);
        }
        else {
            startdate.setSeconds(startdate.getSeconds() - 1);
        }
        //var datei = new Date();
        //var n = datelessthan.toISOString();
        let data = yield postRepos.getposts(11, startdate, greaterthanstartdate);
        var blogPosts = data;
        if (blogPosts != null) {
            for (var item of blogPosts) {
                let max = 1500;
                if (item.postbody.length < 1499) {
                    max = item.postbody.length;
                }
                item.postbody = item.postbody.substring(0, max);
                item.postbody = item.postbody + "...";
            }
        }
        let morepostsavailable = false;
        //let lastpostdate : Date = null;
        var lastpostdate = null;
        if (data != null && data.length == 11) {
            morepostsavailable = true;
            lastpostdate = greaterthanstartdate ? blogPosts[9].posttimestamp : blogPosts[0].posttimestamp;
            //.toISOString();
            //removes last value from array so that lastpostdate will represent 10th item.
            blogPosts.pop();
        }
        res.render('blog/blog', { title: 'AlmosLataan Blog', loggedin: loggedin, isadmin: isadmin, posts: blogPosts, morepostsavailable: morepostsavailable, startdate: lastpostdate, previousstartdate: startdate });
    });
}
function regeneratesitemap() {
    return __awaiter(this, void 0, void 0, function* () {
        //Delete old sitemap
        //const fis = require('fs');
        //fis.unlinkSync(filepath);
        //build sitemapstring
        let sitemapstring = "";
        sitemapstring += '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        let postRepos = new PostRepository.postRepository();
        let posts = yield postRepos.getallposts();
        for (var post of posts) {
            var moment = require('moment');
            let postdate = post.postdate;
            let posturl = post.posturl != null ? post.posturl : post.posttitle;
            let datestring = moment(postdate).format('YYYY-MM-DD');
            let blogpost = '<url><loc>https://almoslataan.com/' + posturl + '-' + post.id.toString() + '</loc><lastmod>' + datestring + '</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>';
            sitemapstring = sitemapstring + blogpost;
        }
        let frontpage = '<url><loc>https://almoslataan.com/</loc><lastmod>2016-09-27</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>';
        let portfolio = '<url><loc>https://almoslataan.com/portfolio</loc><lastmod>2016-09-27</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>';
        //let blog : string = '<url><loc>https://almoslataan.com/blog</loc><lastmod>2016-09-27</lastmod><changefreq>weekly</changefreq><priority>0.4</priority></url>'
        let store = '<url><loc>https://almoslataan.com/store</loc><lastmod>2016-09-27</lastmod><changefreq>monthly</changefreq><priority>0.1</priority></url>';
        let about = '<url><loc>https://almoslataan.com/contact</loc><lastmod>2016-09-27</lastmod><changefreq>monthly</changefreq><priority>0.1</priority></url>';
        sitemapstring = sitemapstring + frontpage;
        sitemapstring = sitemapstring + portfolio;
        //sitemapstring = sitemapstring + blog;
        sitemapstring = sitemapstring + store;
        sitemapstring = sitemapstring + about;
        sitemapstring = sitemapstring + '</urlset>';
        //Create new sitemap
        var fs = require('fs');
        fs.writeFile("./public/sitemap.xml", sitemapstring, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
}
module.exports = router;
//# sourceMappingURL=blog.js.map