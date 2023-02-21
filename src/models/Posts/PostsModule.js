"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAdvertisement = exports.PostImage = exports.Post = void 0;
class Post {
    //postimages: Array< ImageInfo>;
    //_postimage : Images.ImageInfo;
    //constructor(postTitle : string, postBody : string);
    constructor(postTitle, postBody, postExcerpt, id, postURL, postDate) {
        this.setPostTitle(postTitle);
        this.setPostExcerpt(postExcerpt);
        this.postbody = postBody;
        this.id = id != null ? id : null;
        this.postdate = postDate != null ? postDate : new Date();
    }
    setPostTitle(postTitle) {
        this.posttitle = postTitle;
        this.posturl = postTitle.replace(/\s/g, "-");
    }
    setPostExcerpt(postExcerpt) {
        if (postExcerpt == "" || postExcerpt == null) {
            this.postexcerpt = postExcerpt;
        }
        else {
            let stringlength = postExcerpt.length < 500 ? postExcerpt.length : 499;
            this.postexcerpt = postExcerpt.substring(0, stringlength);
        }
    }
}
exports.Post = Post;
class PostImage {
    //_postimage : Images.ImageInfo;
    constructor(postid, imageid) {
        this.postid = postid;
        this.imageid = imageid;
        this.datecreated = new Date();
        //defaults
        this.imagetype = "Main";
        this.imagetypeorder = 0;
        this.sizecontrollingdimension = "width";
        this.sizecontrollingpercentage = "50%";
    }
}
exports.PostImage = PostImage;
class PostAdvertisement {
    constructor(postid, advertisementid, position, postadvertisementid, datecreated) {
        this.postid = postid;
        this.advertisementid = advertisementid;
        this.position = position;
        this.postadvertisementid = postadvertisementid == null ? null : postadvertisementid;
        this.datecreated = datecreated == null ? new Date() : datecreated;
    }
}
exports.PostAdvertisement = PostAdvertisement;
//# sourceMappingURL=PostsModule.js.map