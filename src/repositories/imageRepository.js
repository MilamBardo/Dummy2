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
exports.imageRepository = void 0;
const Images = require("../models/Images/ImagesModule");
//import * as GalleryImages from '../models/Images/GalleryImage';
const dbProvider = require("../../db");
class imageRepository {
    constructor() {
        this.db = dbProvider.dbpool;
    }
    //ADDS
    addimageinfo(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one('INSERT INTO imageinfos(imagename, imagefilepath, imagetitle, imagealt, height, width, orientation, datecreated, imagebuylink) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING imageid', [image.imagename, image.imagefilepath, image.imagetitle, image.imagealt, image.height, image.width, image.orientation, image.datecreated, image.imagebuylink]);
            return res.imageid;
        });
    }
    ;
    //UPDATES
    updateimageinfo(image) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('UPDATE imageinfos SET imagealt = $1, imagetitle = $2, imagebuylink = $3 WHERE imageid = $4', [image.imagealt, image.imagetitle, image.imagebuylink, image.imageid]);
        });
    }
    //GETS
    getimageinfobyimageid(imageid) {
        return __awaiter(this, void 0, void 0, function* () {
            //return this.db.oneOrNone('SELECT * FROM imageinfos where imageid = $1', [imageid]);
            let image = yield this.db.oneOrNone('SELECT * FROM imageinfos where imageid = $1', [imageid]);
            if (image != null) {
                let mappedimage;
                let imageid = image.imageid;
                let imagename = image.imagename;
                let imagefilepath = image.imagefilepath;
                let imagetitle = image.imagetitle;
                let imagealt = image.imagealt;
                let imagedatecreated = image.datecreated;
                let height = image.height;
                let width = image.width;
                let orientation = image.orientation;
                let imagebuylink = image.imagebuylink;
                mappedimage = new Images.ImageInfo(imagename, imagefilepath, imagealt, imagetitle, height, width, imageid, imagebuylink);
                return mappedimage;
            }
            else {
                return null;
            }
        });
    }
    ;
    getallimages() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.manyOrNone('select * from imageinfos');
            return res;
        });
    }
    ;
    getimagesbypostid(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.manyOrNone('select pi.postimageid, pi.postimagecaption, i.* from imageinfos i inner join postimages pi on i.imageid=pi.imageid where pi.postid = $1', [postid]);
            return res;
        });
    }
    ;
    //DELETES
    deleteimageinfo(imageid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.query('DELETE FROM imageinfos WHERE imageid =$1', [imageid]);
            return res;
        });
    }
    ;
}
exports.imageRepository = imageRepository;
//# sourceMappingURL=imageRepository.js.map