export class Advertisement {

    advertisementid : number;
    name : string;
    html : string;
    advertisementtypeid : number;
    isdeleted : boolean;
    datecreated : Date;

    constructor(name : string, adhtml : string, advertisementtypeid: number, id? : number, datecreated? : Date) {
        this.name = name;
        this.html = adhtml;
        this.advertisementtypeid = advertisementtypeid;

        this.advertisementid = id == null ? null : id;
        this.datecreated = datecreated == null ? new Date() : datecreated;
    }
}

export class AdvertisementType {

    advertisementtypeid : number;
    advertisementtype : string;
    isdeleted : boolean;
    datecreated : Date;

     constructor(advertisementtype : string, isdeleted : boolean, advertisementtypeid? : number, datecreated? : Date) {
        this.advertisementtype = advertisementtype;
        this.isdeleted = false;
        this.advertisementtypeid = advertisementtypeid == null ? null : advertisementtypeid;
        this.datecreated = datecreated == null ? new Date() : datecreated;

     }
}