"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisementType = exports.Advertisement = void 0;
class Advertisement {
    constructor(name, adhtml, advertisementtypeid, id, datecreated) {
        this.name = name;
        this.html = adhtml;
        this.advertisementtypeid = advertisementtypeid;
        this.advertisementid = id == null ? null : id;
        this.datecreated = datecreated == null ? new Date() : datecreated;
    }
}
exports.Advertisement = Advertisement;
class AdvertisementType {
    constructor(advertisementtype, isdeleted, advertisementtypeid, datecreated) {
        this.advertisementtype = advertisementtype;
        this.isdeleted = false;
        this.advertisementtypeid = advertisementtypeid == null ? null : advertisementtypeid;
        this.datecreated = datecreated == null ? new Date() : datecreated;
    }
}
exports.AdvertisementType = AdvertisementType;
//# sourceMappingURL=AdvertisementsModule.js.map