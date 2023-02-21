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
const ImageRepository = require("../repositories/imageRepository");
const GalleryRepository = require("../repositories/galleryRepository");
const Images = require("../models/Images/ImagesModule");
const expresssession = require('express-session');
//const Promise = require('es6-promise');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
let router = express.Router();
router.get('/', (req, res) => {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    if (loggedin && isadmin) {
        try {
            displayadminpanel(req, res, null);
        }
        catch (err) {
            throw new Error("caught an error");
        }
    }
    else {
        res.render('index', { title: 'AlmosLataan Home', loggedin: false });
    }
});
function displayadminpanel(req, res, err) {
    return __awaiter(this, void 0, void 0, function* () {
        let loggedin = req.session.username == null ? false : true;
        let isadmin = req.session.userisadmin == null ? false : true;
        if (loggedin && isadmin) {
            //load gallery list
            let galleryRepos = new GalleryRepository.galleryRepository();
            let imageRepos = new ImageRepository.imageRepository();
            let galleryresult = yield galleryRepos.getallgalleries();
            if (galleryresult != null) {
                let imagelist = yield imageRepos.getallimages();
                res.render('admin/adminpanel', { title: 'AlmosLataan Admin', galleries: galleryresult, imagelist: imagelist, errmsg: err });
            }
        }
        else {
            res.render('index', { title: 'AlmosLataan Home', loggedin: false });
        }
    });
}
router.post('/uploadimage', upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    try {
        if (loggedin && isadmin) {
            let imagename = req.body.imagename;
            let alttext = req.body.alttext;
            let imagetitle = req.body.imagetitle;
            let imagecaption = req.body.imagecaption;
            let imagebuylink = req.body.imagebuylink;
            var path = require('path'), fs = require('fs');
            let tempPath = req.file.path;
            let tempBasename = path.basename(tempPath);
            let savePath = /uploads/ + imagename + '.jpg';
            //LOCAL
            let targetPath = path.resolve('./public/uploads/' + imagename + '.jpg');
            //LIVE
            //let targetPath = path.resolve('./apps/Almos/public/uploads/'+imagename+'.jpg');
            if (path.extname(req.file.originalname).toLowerCase() === '.jpg') {
                var sizeOf = require('image-size');
                //sizeOf(tempPath, function (err : any, dimensions : any) {
                //if (err) throw err;
                var dimensions = sizeOf(tempPath);
                var imgwidth = dimensions.width;
                var imgheight = dimensions.height;
                if (imgwidth > 200 && imgheight > 200) {
                    let imageRepos = new ImageRepository.imageRepository();
                    //displayadminpanel(req,res, "pastimageRepos. temppath="+tempPath+" targetpath="+targetPath);
                    yield fs.promises.rename(tempPath, targetPath);
                    // if (err) throw err;
                    //displayadminpanel(req,res, "past fs rename. temppath="+tempPath+" targetpath="+targetPath);
                    let imageinfo = new Images.ImageInfo(imagename, savePath, alttext, imagetitle, imgheight, imgwidth, imagebuylink);
                    yield imageRepos.addimageinfo(imageinfo);
                    yield displayadminpanel(req, res, null);
                }
                else {
                    yield displayadminpanel(req, res, "image width and height not greater than");
                }
            }
            else {
                fs.unlink(tempPath, function (err) {
                    if (err)
                        throw err;
                    console.error("Only .jpg files are allowed!");
                });
                yield displayadminpanel(req, res, "path not equal to jpg");
            }
        }
        else {
            yield displayadminpanel(req, res, "either notlogged in or not admin");
        }
    }
    catch (error) {
        yield displayadminpanel(req, res, "error caught");
    }
}));
router.get('/editimage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    if (loggedin && isadmin) {
        let imageid = req.query.imagelist;
        let imageRepos = new ImageRepository.imageRepository();
        let imageinfo = yield imageRepos.getimageinfobyimageid(imageid);
        res.render('admin/editimage', { loggedin: loggedin, isadmin: isadmin, image: imageinfo });
    }
    else {
        res.render('index', { title: 'AlmosLataan Home', loggedin: false });
    }
}));
router.post('/editimage', upload.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    if (loggedin && isadmin) {
        let imageid = req.body.imageid;
        //let imagename = req.body.imagename;
        let alttext = req.body.alttext;
        let imagetitle = req.body.imagetitle;
        //let imagecaption = req.body.imagecaption;
        let imagebuylink = req.body.imagebuylink;
        let imageRepos = new ImageRepository.imageRepository();
        let masterimage = yield imageRepos.getimageinfobyimageid(imageid);
        masterimage.imagealt = alttext;
        masterimage.imagetitle = imagetitle;
        masterimage.imagebuylink = imagebuylink;
        let result = yield imageRepos.updateimageinfo(masterimage);
        displayadminpanel(req, res, masterimage.imagename + "updated");
    }
}));
router.get('/addnewgallery', (req, res) => {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    if (loggedin && isadmin) {
        res.render('admin/addnewgallery', { loggedin: loggedin, isadmin: isadmin });
    }
    else {
        //probably been logged out
        displayadminpanel(req, res, "user logged out or not admin");
    }
});
router.post('/addnewgallery', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    if (loggedin && isadmin) {
        let galleryname = req.body.galleryname;
        let galleryisprivate = req.body.galleryisprivate;
        let galleryisdefault = req.body.isdefault;
        let galleryRepos = new GalleryRepository.galleryRepository();
        let newgallery = new Images.Gallery(galleryname);
        newgallery.isdefault = galleryisdefault == "on" ? true : false;
        newgallery.isprivate = galleryisprivate == "on" ? true : false;
        if (galleryisdefault) {
            yield galleryRepos.updatedefaultgallerytofalse();
            yield galleryRepos.addgallery(newgallery);
            displayadminpanel(req, res, null);
        }
        else {
            yield galleryRepos.addgallery(newgallery);
            displayadminpanel(req, res, null);
        }
    }
}));
router.post('/editgallery', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    let galleryid = req.body.galleryid;
    let galleryname = req.body.galleryname;
    let galleryisprivate = req.body.galleryisprivate == "on" ? true : false;
    ;
    let isdefault = req.body.isdefault == "on" ? true : false;
    ;
    let galleryRepos = new GalleryRepository.galleryRepository();
    let imageRepos = new ImageRepository.imageRepository();
    if (loggedin && isadmin && galleryid != undefined) {
        //fetch gallery
        let gallery = yield galleryRepos.getgallerybyid(galleryid);
        if (gallery) {
            gallery.galleryname = galleryname;
            gallery.isdefault = isdefault;
            gallery.isprivate = galleryisprivate;
            yield galleryRepos.updategallery(gallery);
            fetchGallery(req, res, galleryid);
        }
        else {
            //probably been logged out
            displayadminpanel(req, res, "cannot edit gallery");
        }
    }
}));
router.get('/editgallery', (req, res) => {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    let galleryid = req.query.gallerylist;
    if (loggedin && isadmin && galleryid != undefined) {
        //fetch gallery
        fetchGallery(req, res, galleryid);
    }
    else {
        //probably been logged out
        displayadminpanel(req, res, "cannot edit gallery");
    }
});
router.post('/deleteImageFromGallery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            let galleryRepos = new GalleryRepository.galleryRepository();
            let galleryimageid = req.body[0].galleryimageid;
            yield galleryRepos.deletegalleryimage(galleryimageid);
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify("imagedeleted"));
        }
        else {
            throw new Error("no request body provided");
        }
    }
    catch (e) {
        //should really log first;
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        let errorstring = e.message;
        res.end(JSON.stringify("error when deleting image from gallery" + errorstring));
    }
}));
//save gallery ajax request
router.post('/saveGallery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            let galleryRepos = new GalleryRepository.galleryRepository();
            var imagearray = req.body;
            //ideally, these should all be in a transaction, but whatever;
            for (var item of imagearray) {
                //first, check whether image has a agllery image yet
                if (item.galleryimageid == "") {
                    //insert galleryimages
                    let gimage = new Images.GalleryImage(item.galleryid, item.imageid, item.galleryimagesortnumber, "width", "50%");
                    gimage.galleryimagecaption = "no info";
                    yield galleryRepos.addgalleryimage(gimage);
                }
                else {
                    //change order of gallery image
                    //should really fetch from server 1st, but going to skip that and just add a method
                    yield galleryRepos.updategalleryimagesortorderbyid(item.galleryimageid, item.galleryimagesortnumber);
                }
            }
            //success
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify(true));
        }
        else {
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(JSON.stringify("no data supplied"));
        }
    }
    catch (e) {
        res.setHeader("Content-Type", "text/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify("exception caught"));
    }
    //res.send(JSON.stringify({ result: true }));
    //Rest of the code
}));
router.post('fetchimage', (req, res) => {
    if (req.body) {
        let imageRepos = new ImageRepository.imageRepository();
        var imagearray = req.body;
        var imagerequired = imagearray[0];
        var imageid = imagerequired.imageid;
    }
});
function fetchGallery(req, res, galleryid) {
    return __awaiter(this, void 0, void 0, function* () {
        let loggedin = req.session.username == null ? false : true;
        let isadmin = req.session.userisadmin == null ? false : true;
        let galleryRepos = new GalleryRepository.galleryRepository();
        let imageRepos = new ImageRepository.imageRepository();
        let gallery = yield galleryRepos.getgallerybyid(galleryid);
        if (gallery == undefined || gallery == null) {
            displayadminpanel(res, req, "Cannot edit gallery as gallery not found");
        }
        let galleryimages = yield galleryRepos.getimagesbygalleryid(galleryid);
        //Check for further other Images
        let otherimages = yield imageRepos.getallimages();
        let remaining = [];
        for (var oimage of otherimages) {
            var found = false;
            for (var gimage of galleryimages) {
                if (oimage.imageid == gimage.imageid) {
                    found = true;
                }
            }
            if (!found) {
                remaining.push(oimage);
            }
        }
        //Have all information so display
        res.render('admin/editgallery', { loggedin: loggedin, isadmin: isadmin, gallery: gallery, galleryimages: galleryimages, otherimages: remaining });
    });
}
module.exports = router;
//# sourceMappingURL=admin.js.map