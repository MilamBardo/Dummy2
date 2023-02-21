/// <reference path="../Images/ImagesModule.ts"/>
import * as Images from "../Images/ImagesModule"
import * as Advertisements from "../Advertisements/AdvertisementsModule"

export class Post {
    id : number;
    posttitle : string;
    posturl : string;
    postexcerpt : string;
    postbody : string;
    postdate : Date; 
    image :  Images.ImageInfo;
    //postimages: Array< ImageInfo>;
    //_postimage : Images.ImageInfo;
    
  //constructor(postTitle : string, postBody : string);
  constructor(postTitle : string, postBody : string, postExcerpt : string,  id? : number, postURL? : string, postDate? : Date)
  {
    this.setPostTitle(postTitle);
    this.setPostExcerpt(postExcerpt);
    this.postbody = postBody;
    this.id = id != null ? id : null;
    this.postdate = postDate != null ? postDate : new Date();
    
  }

  public setPostTitle(postTitle : string)
  {
    this.posttitle = postTitle;
    this.posturl = postTitle.replace(/\s/g, "-");
  }

  public setPostExcerpt(postExcerpt : string)
  {
    if (postExcerpt == "" || postExcerpt == null) 
    {
      this.postexcerpt = postExcerpt;
    }
    else 
    {
      let stringlength : number = postExcerpt.length < 500 ? postExcerpt.length : 499;
      this.postexcerpt = postExcerpt.substring(0, stringlength);
    }
  }

  // public getPostTitle()
  // {
  //   return this._posttitle;
  // }

  // public getPostURL()
  // {
  //   return this._posturl;
  // }
}

export class PostImage {
    postimageid : number;
    postid : number;
    imageid : number;
    postimagecaption: string;
    sizecontrollingdimension: string;
    sizecontrollingpercentage: string;
    imagetype : string;
    imagetypeorder: number;
    datecreated : Date; 
    //_postimage : Images.ImageInfo;
    
  constructor(postid : number, imageid : number) {
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

export class PostAdvertisement {

  postadvertisementid : number;
  postid : number;
  advertisementid : number;
  position : string;
  datecreated : Date;

    constructor(postid : number, advertisementid : number, position : string, postadvertisementid? : number, datecreated? : Date) {
      this.postid = postid;
      this.advertisementid = advertisementid;
      this.position = position;

      this.postadvertisementid = postadvertisementid == null ? null : postadvertisementid;
      this.datecreated = datecreated == null ? new Date() : datecreated;
    }

}