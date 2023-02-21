"use strict";
const express = require("express");
const expresssession = require('express-session');
const Promise = require('es6-promise');
//var multer  = require('multer')
//var upload = multer({ dest: 'uploads/' })
let router = express.Router();
router.get('/', (req, res) => {
});
router.get('/:imagename', (req, res) => {
    let imagename = "/uploads/" + req.params.imagename;
    res.render('viewimage', { imagename: imagename });
});
module.exports = router;
//# sourceMappingURL=uploads.js.map