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
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryRepository = void 0;
const Images = require("../models/Images/ImagesModule");
//import * as GalleryImages from '../models/Images/GalleryImage';
const dbProvider = require("../../db");
class galleryRepository {
    constructor() {
        this.db = dbProvider.dbpool;
    }
    //ADDS
    addgallery(gallery) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one('INSERT INTO galleries(galleryname, isdefault, isprivate, datecreated) VALUES($1, $2, $3, $4) RETURNING galleryid', [gallery.galleryname, gallery.isdefault, gallery.isprivate, gallery.datecreated]);
            return res.galleryid;
        });
    }
    ;
    addgalleryimage(galleryimage) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one('INSERT INTO galleryimages(galleryid, imageid, galleryimageordernumber, galleryimagecaption, sizecontrollingdimension, sizecontrollingpercentage, datecreated) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING galleryimageid', [galleryimage.galleryid, galleryimage.imageid, galleryimage.galleryimageordernumber, galleryimage.galleryimagecaption, galleryimage.sizecontrollingdimension, galleryimage.sizecontrollingpercentage, galleryimage.datecreated]);
            return res.galleryimageid;
        });
    }
    ;
    //UPDATES
    updategallery(gallery) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('UPDATE galleries SET galleryname = $1, isdefault = $2, isprivate = $3 WHERE galleryid = $4', [gallery.galleryname, gallery.isdefault, gallery.isprivate, gallery.galleryid]);
        });
    }
    updategalleryimage(galleryimage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('UPDATE galleryimages SET galleryimagecaption = $1, galleryimageordernumber = $2, sizecontrollingdimension = $3, sizecontrollingpercentage=$4 WHERE galleryimageid=$5', [galleryimage.galleryimagecaption, galleryimage.galleryimageordernumber, galleryimage.sizecontrollingdimension, galleryimage.sizecontrollingpercentage, galleryimage.galleryimageid]);
        });
    }
    updategalleryimagesortorderbyid(galleryimageid, sortnumber) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('UPDATE galleryimages SET galleryimageordernumber = $1 WHERE galleryimageid=$2', [sortnumber, galleryimageid]);
        });
    }
    updatedefaultgallerytofalse() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('UPDATE galleries SET isdefault = $1', [false]);
        });
    }
    //GETS
    getgallerybyid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //return this.db.oneOrNone('SELECT * FROM galleries where galleryid=$1', [id]);
            let gallery = yield this.db.oneOrNone('SELECT * FROM galleries where galleryid=$1', [id]);
            let mappedgallery;
            let gid = gallery.galleryid;
            let gname = gallery.galleryname;
            let gisdefault = gallery.isdefault;
            let gisprivate = gallery.isprivate;
            let gdatecreated = gallery.datecreated;
            mappedgallery = new Images.Gallery(gname, gid, gisdefault, gisprivate, gdatecreated);
            return mappedgallery;
        });
    }
    ;
    getallgalleries() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.manyOrNone('SELECT * FROM galleries');
            return res;
        });
    }
    ;
    getallnonprivategalleries() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.manyOrNone('SELECT * FROM galleries WHERE isprivate = false');
            return res;
        });
    }
    ;
    getdefaultgallery() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.oneOrNone('SELECT * FROM galleries where isdefault = true');
            return res;
        });
    }
    ;
    getimagesbygalleryid(galleryid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.manyOrNone('select i.*, gi.galleryimageid, gi.sizecontrollingdimension, gi.sizecontrollingpercentage from imageinfos i inner join galleryimages gi on i.imageid = gi.imageid inner join galleries g on gi.galleryid = g.galleryid where g.galleryid = $1 order by gi.galleryimageordernumber asc', galleryid);
            return res;
        });
    }
    ;
    getgalleryimagebygalleryimageid(galleryimageid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = this.db.one('select gi.*, i.imagealt, i.imagetitle from galleryimages gi inner join imageinfos i on gi.imageid = i.imageid where galleryimageid=$1', [galleryimageid]);
            return res;
        });
    }
    ;
    //DELETES
    deletegalleryimage(galleryimageid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('DELETE FROM galleryimages WHERE galleryimageid = $1', [galleryimageid]);
        });
    }
}
exports.galleryRepository = galleryRepository;
//# sourceMappingURL=galleryRepository.js.map