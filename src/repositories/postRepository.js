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
exports.postRepository = void 0;
const Posts = require("../models/Posts/PostsModule");
const dbProvider = require("../../db");
class postRepository {
    constructor() {
        this.db = dbProvider.dbpool;
    }
    add(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one('INSERT INTO posts(posttitle, postURL, postexcerpt, postbody, postdate) VALUES($1, $2, $3, $4, $5) RETURNING id', [post.posttitle, post.posturl, post.postexcerpt, post.postbody, post.postdate]);
            return res.id;
        });
    }
    ;
    addpostimage(postimage) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one('INSERT INTO postimages(postid, imageid, postimagecaption, sizecontrollingdimension, sizecontrollingpercentage, imagetype, imagetypeorder, datecreated) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING postimageid', [postimage.postid, postimage.imageid, postimage.postimagecaption, postimage.sizecontrollingdimension, postimage.sizecontrollingpercentage, postimage.imagetype, postimage.imagetypeorder, postimage.datecreated]);
            return res.postimageid;
        });
    }
    ;
    addpostadvertisement(postadvertisement) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one('INSERT INTO postadvertisements(postid, advertisementid,  position, datecreated) VALUES($1, $2, $3, $4) RETURNING postadvertisementid', [postadvertisement.postid, postadvertisement.advertisementid, postadvertisement.position, postadvertisement.datecreated]);
            return res.postadvertisementid;
        });
    }
    //UPDATES
    updatepostimage(postimage) {
        return __awaiter(this, void 0, void 0, function* () {
            //hacky - should really be using postimageid, but need to figureout how to map objects properly
            yield this.db.result('UPDATE postimages SET imageid = $1, postimagecaption = $2 WHERE postid=$3', [postimage.imageid, postimage.postimagecaption, postimage.postid]);
        });
    }
    updatepost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('update posts set posttitle = $1, postURL=$2, postexcerpt=$3, postbody=$4 where id=$5', [post.posttitle, post.posturl, post.postexcerpt, post.postbody, post.id]);
        });
    }
    ;
    //GETS
    getpostbyid(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield this.db.oneOrNone('SELECT * FROM posts WHERE id =$1', [postid]);
            let mappedpost;
            let ptitle = post.posttitle;
            let pexcerpt = post.postexcerpt;
            let pbody = post.postbody;
            let id = post.id;
            let url = post.posturl;
            let pdate = post.postdate;
            mappedpost = new Posts.Post(ptitle, pbody, pexcerpt, id, url, pdate);
            return mappedpost;
        });
    }
    ;
    getpostimagesbypostid(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.manyOrNone('SELECT pi.*, i.imagefilepath, i.imagebuylink, i.imagealt, i.imagetitle FROM postimages pi inner join imageinfos i on pi.imageid = i.imageid WHERE postid =$1', [postid]);
            return res;
        });
    }
    ;
    getpostimagebypostimageid(postimageid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one('SELECT * FROM postimages WHERE postimageid =$1', [postimageid]);
            return res;
        });
    }
    ;
    getposts(postnumber, startdate, greaterthanstartdate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (greaterthanstartdate) {
                const res = yield this.db.manyOrNone('select p.* , p.postdate::timestamptz as posttimestamp, i.imagefilepath, i.imagealt, i.orientation, pi.postimagecaption from posts p left join postimages pi on p.id=pi.postid left join imageinfos i on pi.imageid = i.imageid WHERE p.postdate < $1::timestamptz  order by p.postdate desc limit $2', [startdate, postnumber]);
                return res;
            }
            else {
                const res = yield this.db.manyOrNone('select * from (select p.* , p.postdate::timestamptz as posttimestamp, i.imagefilepath, i.imagealt, i.orientation, pi.postimagecaption from posts p left join postimages pi on p.id=pi.postid left join imageinfos i on pi.imageid = i.imageid WHERE p.postdate > $1::timestamptz  order by p.postdate asc limit $2)cunt order by postdate desc ', [startdate, postnumber]);
                return res;
                //need to change select so that 
            }
        });
    }
    ;
    getallposts() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.manyOrNone('select * from posts');
            return res;
        });
    }
    ;
    getpostadvertisementsforselect(postid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.manyOrNone('SELECT pa.postadvertisementid, a.name, a.html, pa.position FROM postadvertisements pa INNER JOIN advertisements a ON pa.advertisementid = a.advertisementid  WHERE pa.isdeleted=false and a.isdeleted = false and pa.postid = $1', [postid]);
            return res;
        });
    }
    ;
    //DELETES
    deletepostimage(postimageid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('DELETE FROM postimages WHERE postimageid = $1', [postimageid]);
        });
    }
    deletepostimagesbyimageid(imageid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.result('DELETE FROM postimages WHERE imageid = $1', [imageid]);
        });
    }
}
exports.postRepository = postRepository;
//# sourceMappingURL=postRepository.js.map