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
const GalleryRepository = require("../repositories/galleryRepository");
const Images = require("../models/Images/ImagesModule");
const expresssession = require('express-session');
//const Promise = require('es6-promise');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
let router = express.Router();
router.get('/', (req, res) => {
    try {
        displayMainPortfolio(req, res);
    }
    catch (err) {
        throw new Error("caught an error");
    }
});
router.get('/addportfolioimage', (req, res) => {
    let loggedin = req.session.username == null ? false : true;
    let isadmin = req.session.userisadmin == null ? false : true;
    if (loggedin && isadmin) {
        let galleryid = req.query.galleryid;
        let gallerytotal = req.query.gallerytotal;
        res.render('portfolio/addportfolioimage', { loggedin, isadmin, portfoliogalleryid: galleryid, gallerytotal: gallerytotal });
    }
});
router.post('/fetchGallery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            let galleryid = req.body[0].galleryid;
            let galleryRepos = new GalleryRepository.galleryRepository();
            let gallery = yield galleryRepos.getgallerybyid(galleryid);
            if (gallery != null) {
                let galleryimages = yield galleryRepos.getimagesbygalleryid(gallery.galleryid);
                //might be null
                gallery.galleryimages = galleryimages;
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify(gallery));
            }
            else {
                res.setHeader("Content-Type", "text/json");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.end(JSON.stringify("gallery not found"));
            }
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
function deleteFile(filepath) {
    const fs = require('fs');
    fs.unlinkSync(filepath);
}
function displayMainPortfolio(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let loggedin = req.session.username == null ? false : true;
        let isadmin = req.session.userisadmin == null ? false : true;
        let galleryRepos = new GalleryRepository.galleryRepository();
        let gallery = yield galleryRepos.getdefaultgallery();
        if (gallery == null) {
            //No default gallery set yet, so insert one
            let defaultgallery = new Images.Gallery("Featured");
            defaultgallery.isdefault = true;
            let galleryid = galleryRepos.addgallery(defaultgallery);
            defaultgallery.galleryid = galleryid;
            res.render('portfolio/portfolio', { title: 'AlmosLataan Portfolio', loggedin: loggedin, isadmin: isadmin, mainportfolio: defaultgallery });
        }
        else {
            let galleryimages = yield galleryRepos.getimagesbygalleryid(gallery.galleryid);
            //might be null
            gallery.galleryimages = galleryimages;
            let gallerytotal = galleryimages.length;
            let allgallerynames = yield galleryRepos.getallnonprivategalleries();
            res.render('portfolio/portfolio', { title: 'AlmosLataan Portfolio', loggedin: loggedin, isadmin: isadmin, mainportfolio: gallery, gallerytotal: gallerytotal, allgallerynames: allgallerynames });
        }
    });
}
module.exports = router;
//# sourceMappingURL=portfolio.js.map