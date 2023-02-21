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
exports.advertisementRepository = void 0;
const Ads = require("../models/Advertisements/AdvertisementsModule");
const dbProvider = require("../../db");
class advertisementRepository {
    constructor() {
        this.db = dbProvider.dbpool;
    }
    //ADDS
    addadvertisement(advertisement) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one('INSERT INTO advertisements(name, html, advertisementtypeid, datecreated) VALUES($1, $2, $3, $4) RETURNING advertisementid', [advertisement.name, advertisement.html, advertisement.advertisementtypeid, advertisement.datecreated]);
            return res.advertisementid;
        });
    }
    ;
    //GETS
    getalladvertisementtypes() {
        return __awaiter(this, void 0, void 0, function* () {
            let typearray = yield this.db.manyOrNone('SELECT * FROM advertisementtypes WHERE isdeleted = false');
            let mappedarray = [];
            //let portraits : Array<any> = []
            for (var type of typearray) {
                let mappedtype;
                let advertisementtypeid = type.advertisementtypeid;
                let advertisementtype = type.advertisementtype;
                let isdeleted = type.isdeleted;
                let datecreated = type.datecreated;
                mappedtype = new Ads.AdvertisementType(advertisementtype, isdeleted, advertisementtypeid, datecreated);
                mappedarray.push(mappedtype);
            }
            return mappedarray;
        });
    }
    ;
    getalladvertisements() {
        return __awaiter(this, void 0, void 0, function* () {
            let advertarray = yield this.db.manyOrNone('SELECT * FROM advertisements WHERE isdeleted=false');
            let mappedarray = [];
            //let portraits : Array<any> = []
            for (var advert of advertarray) {
                let mappedadvert;
                let name = advert.name;
                let html = advert.html;
                let pbody = advert.type;
                let id = advert.advertisementid;
                let typeid = advert.advertisementtypeid;
                let datecreated = advert.name;
                mappedadvert = new Ads.Advertisement(name, html, typeid, id, datecreated);
                mappedarray.push(mappedadvert);
            }
            return mappedarray;
        });
    }
}
exports.advertisementRepository = advertisementRepository;
//# sourceMappingURL=advertisementRepository.js.map