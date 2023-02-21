

import * as pg from 'pg';
import * as pgPromise from 'pg-promise';
import * as Images from '../models/Images/ImagesModule';
//import * as GalleryImages from '../models/Images/GalleryImage';
import dbProvider = require('../../db')

export class galleryRepository
{

    db = dbProvider.dbpool;
    
    constructor() {
            }

    //ADDS
    async addgallery(gallery : Images.Gallery)
    {
            const res =  await this.db.one('INSERT INTO galleries(galleryname, isdefault, isprivate, datecreated) VALUES($1, $2, $3, $4) RETURNING galleryid', [gallery.galleryname, gallery.isdefault, gallery.isprivate, gallery.datecreated]);
            return res.galleryid
    };

    async addgalleryimage(galleryimage : Images.GalleryImage)
    {
            const res = await  this.db.one('INSERT INTO galleryimages(galleryid, imageid, galleryimageordernumber, galleryimagecaption, sizecontrollingdimension, sizecontrollingpercentage, datecreated) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING galleryimageid', [galleryimage.galleryid, galleryimage.imageid, galleryimage.galleryimageordernumber, galleryimage.galleryimagecaption, galleryimage.sizecontrollingdimension, galleryimage.sizecontrollingpercentage, galleryimage.datecreated]);

            return res.galleryimageid
    };

    //UPDATES
    async updategallery(gallery: Images.Gallery)
    {
             await this.db.result('UPDATE galleries SET galleryname = $1, isdefault = $2, isprivate = $3 WHERE galleryid = $4',[gallery.galleryname, gallery.isdefault, gallery.isprivate, gallery.galleryid]);

    }
    async updategalleryimage(galleryimage: Images.GalleryImage)
    {
            await this.db.result('UPDATE galleryimages SET galleryimagecaption = $1, galleryimageordernumber = $2, sizecontrollingdimension = $3, sizecontrollingpercentage=$4 WHERE galleryimageid=$5',[galleryimage.galleryimagecaption, galleryimage.galleryimageordernumber, galleryimage.sizecontrollingdimension, galleryimage.sizecontrollingpercentage, galleryimage.galleryimageid]);
    }

    async updategalleryimagesortorderbyid(galleryimageid:number, sortnumber:number)
    {
            await this.db.result('UPDATE galleryimages SET galleryimageordernumber = $1 WHERE galleryimageid=$2',[sortnumber, galleryimageid]);
    }

    async updatedefaultgallerytofalse(){

                await this.db.result('UPDATE galleries SET isdefault = $1',[false]);
        }

    //GETS
    async getgallerybyid(id : number)
    {
        //return this.db.oneOrNone('SELECT * FROM galleries where galleryid=$1', [id]);
        let gallery: any = await this.db.oneOrNone('SELECT * FROM galleries where galleryid=$1', [id])
        let mappedgallery : Images.Gallery;
        let gid:number = gallery.galleryid;
        let gname : string = gallery.galleryname;
        let gisdefault: boolean = gallery.isdefault;
        let gisprivate: boolean = gallery.isprivate;
        let gdatecreated: Date = gallery.datecreated;
        mappedgallery = new Images.Gallery(gname, gid, gisdefault, gisprivate, gdatecreated);
        return mappedgallery;
                
    };
    async getallgalleries()
    {
            const res =  await this.db.manyOrNone('SELECT * FROM galleries');
            return res
    };
    async getallnonprivategalleries()
    {
            const res = await this.db.manyOrNone('SELECT * FROM galleries WHERE isprivate = false');
            return res
    };
    async getdefaultgallery()
    {
            const res =  await this.db.oneOrNone('SELECT * FROM galleries where isdefault = true');
            return res
    };

    async getimagesbygalleryid(galleryid : number)
    {
            const res = await this.db.manyOrNone('select i.*, gi.galleryimageid, gi.sizecontrollingdimension, gi.sizecontrollingpercentage from imageinfos i inner join galleryimages gi on i.imageid = gi.imageid inner join galleries g on gi.galleryid = g.galleryid where g.galleryid = $1 order by gi.galleryimageordernumber asc', galleryid);

            return res
    };

    async getgalleryimagebygalleryimageid(galleryimageid:number)
    {
        
            const res =  this.db.one('select gi.*, i.imagealt, i.imagetitle from galleryimages gi inner join imageinfos i on gi.imageid = i.imageid where galleryimageid=$1', [galleryimageid]);

            return res
    };

    //DELETES
    async deletegalleryimage(galleryimageid : number)
    {
            await this.db.result('DELETE FROM galleryimages WHERE galleryimageid = $1', [galleryimageid]); 
    }

}