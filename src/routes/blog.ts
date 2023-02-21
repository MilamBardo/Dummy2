

import * as express from "express";
import * as PostRepository from '../repositories/postRepository';
import * as ImageRepository from '../repositories/imageRepository';
import * as AdvertisementRepository from '../repositories/advertisementRepository';
import * as Posts from '../models/Posts/PostsModule';
import * as Ads from '../models/Advertisements/AdvertisementsModule';

const expresssession = require('express-session');
//const Promise = require('es6-promise');
let router = express.Router();
        
router.get('/', async(req:any, res:any) => {
    try{
        await displayBlog(req,res, new Date(), true);
    }
    catch (err)
    {
        throw new Error("caught an error")
    }

});

router.get('/getnextpage/:startdate', async(req:any, res:any) => {
    try{
        var startdate : Date = new Date(req.params.startdate);
        await displayBlog(req,res, startdate, true)
    }
    catch (err)
    {
        throw new Error("caught an error")
    }

});

router.get('/getpreviouspage/:previousstartdate/', async(req:any, res:any) => {
    try{
        var startdate : Date = new Date(req.params.previousstartdate);
        await displayBlog(req,res, startdate, false)
    }
    catch (err)
    {
        throw new Error("caught an error")
    }

});



//reoutes needed
router.get('/:posttitle/:postnumber/', async(req:any, res:any) => {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    let title :string = req.params.posttitle;
    let postnumber :string = req.params.postnumber;

     if (title = "viewpost")
    {
        let suppliedpostid = +postnumber;
        
         let postRepos = new PostRepository.postRepository();
        let post: Posts.Post = await postRepos.getpostbyid(suppliedpostid)

            let imagedata: any = await postRepos.getpostimagesbypostid(suppliedpostid)
            if (imagedata)
            {
                let mainimage : any = null;
                let mainimagefilepath : any = null;
                if (imagedata != null && imagedata.length >0)
                    {
                        mainimage = imagedata[0];
                        mainimagefilepath = "http://almoslataan.com/public/"+imagedata[0].imagefilepath;
                        //mainimagefilepath = imagedata[0].imagefilepath;
                    }
                    
                    res.render('blog/viewpost', { title: post.posttitle, loggedin: loggedin, isadmin: isadmin, post: post, mainimage : mainimage, mainimagefilepath : mainimagefilepath });
            }
    }
});

router.get('/addpost', (req:any, res:any) => {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    
    res.render('blog/addpost', { title: 'AlmosLataan Add New Post', loggedin: loggedin, isadmin: isadmin });
    
});



router.get('/editpost', async(req:any, res:any) => {
    if (req.session.username && req.session.userisadmin)
    {
        let suppliedpostid = req.query.postid;
        let postRepos = new PostRepository.postRepository();
        let imageRepos = new ImageRepository.imageRepository();
        let adsRepos = new AdvertisementRepository.advertisementRepository();

        //This format is due to curretn typescript problems with promise.all.
        let result: Posts.Post = await postRepos.getpostbyid(suppliedpostid)
        let postimages:any;
        let post:Posts.Post;
        let images:any;
        let adtypes:Ads.AdvertisementType[];
        let adverts:Ads.Advertisement[];
        let postadverts: any[];
        
        try
        {
        post = result;
        if (postimages == null || postimages.length == 0) 
        {
            postimages=null;
        }

        let result2 = await imageRepos.getimagesbypostid(suppliedpostid)
        postimages = result2;

        let result3 = await imageRepos.getallimages()
        
        images = result3; 
        adtypes = await adsRepos.getalladvertisementtypes()

        adverts = await adsRepos.getalladvertisements()
        
        postadverts = await postRepos.getpostadvertisementsforselect(suppliedpostid)
        
        res.render('blog/editpost', { title: 'AlmosLataan Edit Post', loggedin: true, isadmin: true, post: post, postimages: postimages, portfolioimages: images, adverttypes: adtypes, adverts: adverts, postadverts : postadverts});
        }
        catch(err)
        {
            await displayBlog(req, res, null, true);
        }
        
    }
});


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

router.post('/editpost', async(req:any, res:any, next: any) =>{
    let suppliedpostid = req.body.postid;
    let suppliedposttitle = req.body.posttitle;
    let suppliedposrexcerpt = req.body.postexcerpt;
    let suppliedpostbody = req.body.postbody;
    let associatedpostimageid = req.body.associatedpostimage;
    let currentpostimageid = req.body.currentpostimage;
    let imagecaption = req.body.imagecaption;

    let postRepos = new PostRepository.postRepository();
    let post: Posts.Post = await postRepos.getpostbyid(suppliedpostid)
    //TEMP while we figure out how to use classes properly
    
    post.setPostTitle(suppliedposttitle);
    post.postbody=suppliedpostbody;
    post.postexcerpt = suppliedposrexcerpt;

    //UPDATE POST
    await postRepos.updatepost(post)

    //NOW FOR IMAGE
    //if already exists and now null -> update as deleted
    //if already exists and now changed -> update imageid
    //if does not already exist, insert
    
    if (currentpostimageid != null)
    {
        
            if (associatedpostimageid == null || associatedpostimageid == "none")
            {
                // DELETE
                await postRepos.deletepostimage(currentpostimageid)
                
                await regeneratesitemap();
                var newdate = new Date();
                await displayBlog(req, res, newdate, true);
            }
            else 
            {
                let fetchedpostimage:any = await postRepos.getpostimagebypostimageid(currentpostimageid)
                    //change
                fetchedpostimage.imageid = associatedpostimageid;
                fetchedpostimage.postimagecaption = imagecaption;

                //Now UPDATE
                await postRepos.updatepostimage(fetchedpostimage)
                
                await regeneratesitemap();
                var newdate = new Date();
                await displayBlog(req, res, newdate, true);
            }
        
    }
    else if (associatedpostimageid != "none")
    {
        //INsert Post IMage
            let postimagenew = new Posts.PostImage(suppliedpostid, associatedpostimageid);
            postimagenew.postimagecaption = imagecaption;
            await postRepos.addpostimage(postimagenew)
            
            await regeneratesitemap();
            var newdate = new Date();
            displayBlog(req, res,  newdate, true);
            
    }
    else
    {
        await regeneratesitemap();
        var newdate = new Date();
        await displayBlog(req, res, newdate, true);
    }

})

router.post('/addpost', async (req:any, res:any, next: any) =>{
    let suppliedposttitle = req.body.posttitle;
    let suppliedpostexcerpt = req.body.postexcerpt;
    let suppliedpostbody = req.body.postbody;

    let newPost = new Posts.Post(suppliedposttitle, suppliedpostbody, suppliedpostexcerpt);
    let postRepos = new PostRepository.postRepository();

    await postRepos.add(newPost)

    await regeneratesitemap();
    var newdate = new Date();
    await displayBlog(req, res, newdate, true);

});

//JSON methods

router.post('/addAdvert', (req:any,res:any) => {
    try{
        if (req.body)
        {
            let advertname = req.body[0].advertname;
            let adverthtml = req.body[0].adverthtml;
            let adverttype = req.body[0].adverttype;

            let advert : Ads.Advertisement = new Ads.Advertisement(advertname, adverthtml, adverttype);

            let adRepos = new AdvertisementRepository.advertisementRepository();
            let result: any = adRepos.addadvertisement(advert)
            //might be null
            
            let success : boolean = false
            if (result != null && result.advertisementid > 0) success = true

            if (success)
            {
                advert.advertisementid = result.advertisementid;
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify(advert));
            }
            else
            {
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify("advert addition was a failue"));
            }
        }
    }
    catch(e)
    {
        //should really log first;
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let errorstring : string = (<Error>e).message;
        res.end(JSON.stringify("error when adding amazonad"+errorstring));
    }
});

router.post('/addAdvertToPost', (req:any,res:any) => {
    try{
        if (req.body)
        {
            let postid = req.body[0].postid;
            let advertid = req.body[0].advertid;
            let position = req.body[0].position;

            let postadvert : Posts.PostAdvertisement= new Posts.PostAdvertisement(postid, advertid, position);

            let postRepos = new PostRepository.postRepository();
            let result: any = postRepos.addpostadvertisement(postadvert)
            //might be null
            
            let success : boolean = false
            if (result != null && result.advertisementid > 0) success = true

            if (success)
            {
                postadvert.postadvertisementid = result.postadvertisementid;
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify(postadvert));
            }
            else
            {
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify("postadvert addition was a failue"));
            }
            

        }
    }
    catch(e)
    {
        //should really log first;
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let errorstring : string = (<Error>e).message;
        res.end(JSON.stringify("error when adding postadvert"+errorstring));
    }
});

router.post('/addAdvertToPost', (req:any,res:any) => {
    try{
        if (req.body)
        {
            let postid = req.body[0].postid;
            let advertid = req.body[0].postid;
            let position = req.body[0].position;

            let postadvert : Posts.PostAdvertisement = new Posts.PostAdvertisement(postid, advertid, position);

        }
    }
    catch(e)
    {
        //should really log first;
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let errorstring : string = (<Error>e).message;
        res.end(JSON.stringify("error when adding advert to post"+errorstring));
    }
});
///Will fetch blog entries and render
async function displayBlog (req: any, res: any, startdate : Date, greaterthanstartdate : boolean)
{
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;

    let postRepos = new PostRepository.postRepository();

    if (greaterthanstartdate)
    {
        startdate.setSeconds(startdate.getSeconds()+1); 
    }
    else 
    { 
        startdate.setSeconds(startdate.getSeconds()-1);
    }
    
    //var datei = new Date();
    //var n = datelessthan.toISOString();
    let data: any = await postRepos.getposts(11, startdate, greaterthanstartdate)
    var blogPosts = data;
    if (blogPosts != null)
    {
        for (var item of blogPosts)
        {
            let max = 1500;
            if (item.postbody.length < 1499)
            {
                max = item.postbody.length;
            }
            item.postbody = item.postbody.substring(0, max);
            item.postbody = item.postbody +"..."
        }
    }
    let morepostsavailable : boolean = false;
    //let lastpostdate : Date = null;
    var lastpostdate : Date = null;
    if (data != null && data.length == 11)
    {
        morepostsavailable = true;
        lastpostdate = greaterthanstartdate ? blogPosts[9].posttimestamp : blogPosts[0].posttimestamp 
        //.toISOString();
        //removes last value from array so that lastpostdate will represent 10th item.
        blogPosts.pop();
    }

    res.render('blog/blog', { title: 'AlmosLataan Blog', loggedin: loggedin, isadmin: isadmin, posts: blogPosts, morepostsavailable : morepostsavailable, startdate : lastpostdate, previousstartdate : startdate });
        
}

async function regeneratesitemap()
{
    //Delete old sitemap
    //const fis = require('fs');
    //fis.unlinkSync(filepath);

    //build sitemapstring
    let sitemapstring : string ="";
    sitemapstring += '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    

    let postRepos = new PostRepository.postRepository();
    let posts: any = await postRepos.getallposts()
        for (var post of posts)
        {
            var moment = require('moment');
            let postdate : Date = post.postdate;
            let posturl = post.posturl != null ? post.posturl : post.posttitle;
            let datestring = moment(postdate).format('YYYY-MM-DD');
            let blogpost = '<url><loc>https://almoslataan.com/'+posturl+'-'+post.id.toString()+'</loc><lastmod>'+datestring+'</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>'
            sitemapstring = sitemapstring + blogpost;

            
        }
        let frontpage : string = '<url><loc>https://almoslataan.com/</loc><lastmod>2016-09-27</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>'
        let portfolio : string = '<url><loc>https://almoslataan.com/portfolio</loc><lastmod>2016-09-27</lastmod><changefreq>weekly</changefreq><priority>0.5</priority></url>'
        //let blog : string = '<url><loc>https://almoslataan.com/blog</loc><lastmod>2016-09-27</lastmod><changefreq>weekly</changefreq><priority>0.4</priority></url>'
        let store : string = '<url><loc>https://almoslataan.com/store</loc><lastmod>2016-09-27</lastmod><changefreq>monthly</changefreq><priority>0.1</priority></url>'
        let about : string = '<url><loc>https://almoslataan.com/contact</loc><lastmod>2016-09-27</lastmod><changefreq>monthly</changefreq><priority>0.1</priority></url>'
        
        sitemapstring = sitemapstring + frontpage;
        sitemapstring = sitemapstring + portfolio;
        //sitemapstring = sitemapstring + blog;
        sitemapstring = sitemapstring + store;
        sitemapstring = sitemapstring + about;
        sitemapstring = sitemapstring +'</urlset>';
        //Create new sitemap
            var fs = require('fs');
            fs.writeFile("./public/sitemap.xml", sitemapstring, function(err : any) {
                if(err) {
                    return console.log(err);
                }
            });
    
}



export= router;
