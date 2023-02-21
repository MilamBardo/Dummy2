
    export class ImageInfo
    {
        imageid : number;
        imagename : string;
        imagefilepath: string;
        imagetitle : string;
        imagealt: string;
        imagebuylink: string;
        datecreated : Date;
        height : number;
        width : number;
        orientation : string;
        
        
        constructor(filename : string, path : string, alt : string, title : string, height : number, width : number, imageid? :number, buylink? : string)
        {
            this.imagename = filename;
            this.imagefilepath = path;
            this.imagealt = alt;
            this.imagetitle = title;
            this.datecreated = new Date();
            this.height = height;
            this.width = width;
            
            this.imageid = imageid == null ? 0 : imageid;
            this.imagebuylink = buylink==null ? null : buylink;

            if (height == width) 
            {this.orientation = "S";} //square
            else if( height > width )
            {this.orientation = "P";} //portrait
            else
            {this.orientation = "L";} //landscape
        }
    }

    export class GalleryImage
    {
        galleryimageid : number;
        galleryid : number;
        imageid : number;
        galleryimageordernumber: number;
        galleryimagecaption : string;
        sizecontrollingdimension : string;
        sizecontrollingpercentage : string;
        datecreated : Date;
        
        constructor(galleryid : number, imageid : number, order : number, dimension : string, percentage : string)
        {
            this.galleryid = galleryid;
            this.imageid = imageid;
            this.galleryimageordernumber = order;
            this.sizecontrollingdimension = dimension;
            this.sizecontrollingpercentage = percentage;
            this.datecreated = new Date();
        }
    }

    export class Gallery
    {
        galleryid : number;
        galleryname : string;
        isdefault : boolean;
        isprivate : boolean;
        datecreated : Date;
        galleryimages : Array<number>;
        
        constructor(name : string, id? : number, isdefault? : boolean, isprivate? : boolean, datecreated? : Date)
        {
            this.galleryname = name;
            this.galleryid = id == null ? 0 : id;
            this.isdefault = isdefault == null ? false : isdefault;
            this.isprivate = isprivate == null ? false : isprivate;
            this.datecreated = new Date();
        }

        
    }
