"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.GalleryImage = exports.ImageInfo = void 0;
class ImageInfo {
    constructor(filename, path, alt, title, height, width, imageid, buylink) {
        this.imagename = filename;
        this.imagefilepath = path;
        this.imagealt = alt;
        this.imagetitle = title;
        this.datecreated = new Date();
        this.height = height;
        this.width = width;
        this.imageid = imageid == null ? 0 : imageid;
        this.imagebuylink = buylink == null ? null : buylink;
        if (height == width) {
            this.orientation = "S";
        } //square
        else if (height > width) {
            this.orientation = "P";
        } //portrait
        else {
            this.orientation = "L";
        } //landscape
    }
}
exports.ImageInfo = ImageInfo;
class GalleryImage {
    constructor(galleryid, imageid, order, dimension, percentage) {
        this.galleryid = galleryid;
        this.imageid = imageid;
        this.galleryimageordernumber = order;
        this.sizecontrollingdimension = dimension;
        this.sizecontrollingpercentage = percentage;
        this.datecreated = new Date();
    }
}
exports.GalleryImage = GalleryImage;
class Gallery {
    constructor(name, id, isdefault, isprivate, datecreated) {
        this.galleryname = name;
        this.galleryid = id == null ? 0 : id;
        this.isdefault = isdefault == null ? false : isdefault;
        this.isprivate = isprivate == null ? false : isprivate;
        this.datecreated = new Date();
    }
}
exports.Gallery = Gallery;
//# sourceMappingURL=ImagesModule.js.map