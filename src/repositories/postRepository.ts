

import * as pg from 'pg';
import * as pgPromise from 'pg-promise';
import * as Posts from '../models/Posts/PostsModule';
import dbProvider = require('../../db')

export class postRepository
{

    db = dbProvider.dbpool;
    
    constructor() {
            }

        async add (post: Posts.Post)
        {
                const res = await this.db.one('INSERT INTO posts(posttitle, postURL, postexcerpt, postbody, postdate) VALUES($1, $2, $3, $4, $5) RETURNING id', [post.posttitle, post.posturl, post.postexcerpt, post.postbody, post.postdate]);

                return res.id
        };

        async addpostimage(postimage : Posts.PostImage)
        {
                const res = await this.db.one('INSERT INTO postimages(postid, imageid, postimagecaption, sizecontrollingdimension, sizecontrollingpercentage, imagetype, imagetypeorder, datecreated) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING postimageid', [postimage.postid, postimage.imageid, postimage.postimagecaption, postimage.sizecontrollingdimension, postimage.sizecontrollingpercentage, postimage.imagetype, postimage.imagetypeorder, postimage.datecreated]);

                return res.postimageid
        };

        async addpostadvertisement(postadvertisement: Posts.PostAdvertisement)
        {
                const res= await this.db.one('INSERT INTO postadvertisements(postid, advertisementid,  position, datecreated) VALUES($1, $2, $3, $4) RETURNING postadvertisementid', [postadvertisement.postid, postadvertisement.advertisementid, postadvertisement.position, postadvertisement.datecreated]);

                return res.postadvertisementid
        }

        //UPDATES
        async updatepostimage(postimage : Posts.PostImage)
        {
                //hacky - should really be using postimageid, but need to figureout how to map objects properly
                await this.db.result('UPDATE postimages SET imageid = $1, postimagecaption = $2 WHERE postid=$3', [postimage.imageid, postimage.postimagecaption,postimage.postid])
        }
        async updatepost(post: Posts.Post)
        {
               await this.db.result('update posts set posttitle = $1, postURL=$2, postexcerpt=$3, postbody=$4 where id=$5', [post.posttitle, post.posturl, post.postexcerpt, post.postbody, post.id]);
        };

        //GETS
        async getpostbyid(postid: number)
        {
                let post: any = await this.db.oneOrNone('SELECT * FROM posts WHERE id =$1', [postid])
                        let mappedpost : Posts.Post;
                        let ptitle : string = post.posttitle;
                        let pexcerpt: string = post.postexcerpt;
                        let pbody: string = post.postbody;
                        let id:number = post.id;
                        let url:string = post.posturl;
                        let pdate: Date = post.postdate
                        mappedpost = new Posts.Post(ptitle, pbody, pexcerpt, id, url, pdate);
                        return mappedpost;
               
        };
        async getpostimagesbypostid(postid : number)
        {
                const res = await this.db.manyOrNone('SELECT pi.*, i.imagefilepath, i.imagebuylink, i.imagealt, i.imagetitle FROM postimages pi inner join imageinfos i on pi.imageid = i.imageid WHERE postid =$1',[postid]);

                return res
        };

        async getpostimagebypostimageid(postimageid : number)
        {
                const res= await this.db.one('SELECT * FROM postimages WHERE postimageid =$1',[postimageid]);

                return res
        };

        async getposts(postnumber: number, startdate : Date, greaterthanstartdate : boolean )
        {
                if (greaterthanstartdate)
                {
                        const res =  await this.db.manyOrNone('select p.* , p.postdate::timestamptz as posttimestamp, i.imagefilepath, i.imagealt, i.orientation, pi.postimagecaption from posts p left join postimages pi on p.id=pi.postid left join imageinfos i on pi.imageid = i.imageid WHERE p.postdate < $1::timestamptz  order by p.postdate desc limit $2', [startdate, postnumber]);

                        return res
                }
                else{
                        const res = await this.db.manyOrNone('select * from (select p.* , p.postdate::timestamptz as posttimestamp, i.imagefilepath, i.imagealt, i.orientation, pi.postimagecaption from posts p left join postimages pi on p.id=pi.postid left join imageinfos i on pi.imageid = i.imageid WHERE p.postdate > $1::timestamptz  order by p.postdate asc limit $2)cunt order by postdate desc ', [startdate, postnumber]);

                        return res
                        //need to change select so that 
                }
        };

        async getallposts()
        {
                const res = await  this.db.manyOrNone('select * from posts');

                return res
        };

        async getpostadvertisementsforselect(postid:number)
        {
                const res = await this.db.manyOrNone('SELECT pa.postadvertisementid, a.name, a.html, pa.position FROM postadvertisements pa INNER JOIN advertisements a ON pa.advertisementid = a.advertisementid  WHERE pa.isdeleted=false and a.isdeleted = false and pa.postid = $1', [postid]);

                return res
        };
        
        //DELETES
        async deletepostimage(postimageid : number)
        {
                await this.db.result('DELETE FROM postimages WHERE postimageid = $1', [postimageid])
        }

        async deletepostimagesbyimageid(imageid : number)
        {
               await  this.db.result('DELETE FROM postimages WHERE imageid = $1', [imageid]) 
        }
        
}