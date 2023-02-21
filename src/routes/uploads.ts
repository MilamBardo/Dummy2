

import * as express from "express";
import * as ImageRepository from '../repositories/imageRepository';
import * as Images from '../models/Images/ImagesModule';

const expresssession = require('express-session');
const Promise = require('es6-promise');

//var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })

let router = express.Router();

router.get('/', (req:any, res:any) => {

});

router.get('/:imagename', (req:any, res:any) => {
    
    let imagename = "/uploads/"+req.params.imagename;

    
res.render('viewimage', { imagename: imagename });
});

export= router;