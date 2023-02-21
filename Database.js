var pg = require('pg');

//LOCAL
var connectionString = process.env.DATABASE_URL || 'postgres://Almos:Talanath5@localhost:5432/Almos';

//Local2 Almos
//var connectionString = process.env.DATABASE_URL || 'postgres://Almos:Talanath5@127.0.0.1:5432/Almos';



// var client1 = new pg.Client(connectionString);
// client1.connect();
// var query1 = client1.query('CREATE TABLE public.users (id SERIAL PRIMARY KEY, name character varying(200) NOT NULL, encryptedpassword character varying(300) NOT NULL, email character varying(200) NOT NULL, lockedout boolean NOT NULL, loginattempts integer NOT NULL, isadmin boolean NOT NULL DEFAULT false, isverified boolean NOT NULL DEFAULT false, created timestamp with time zone NOT NULL DEFAULT NOW());');
// query1.on('end', function() { client1.end(); });

// var client2 = new pg.Client(connectionString);
// client2.connect();
// var query2 = client2.query('CREATE TABLE public.posts(id SERIAL PRIMARY KEY, posttitle character varying(200) NOT NULL,postbody text NOT NULL,postdate timestamp without time zone NOT NULL);');
// query2.on('end', function() { client2.end(); });

// var client3 = new pg.Client(connectionString);
// client3.connect();
// var query3 = client3.query('CREATE TABLE public.session (sid character varying NOT NULL, sess json NOT NULL, expire timestamp(6) without time zone NOT NULL, CONSTRAINT session_pkey PRIMARY KEY (sid)) WITH ( OIDS=FALSE)');
// query3.on('end', function() { client3.end(); });

// var client3 = new pg.Client(connectionString);
// client3.connect();
// var query3 = client5.query('CREATE TABLE public.galleries(galleryid SERIAL PRIMARY KEY, galleryname character varying(200) NOT NULL, isdefault boolean NOT NULL, isprivate boolean NOT NULL, datecreated timestamp without time zone NOT NULL);');
// query3.on('end', function() { client3.end(); });

// var client4 = new pg.Client(connectionString);
// client4.connect();
// var query4 = client4.query('DROP TABLE public.imageinfos; CREATE TABLE public.imageinfos(imageid SERIAL PRIMARY KEY, imagename character varying(300) NOT NULL, imagefilepath character varying(500) NOT NULL, imagetitle character varying(500) NOT NULL, imagealt text NOT NULL, datecreated timestamp without time zone NOT NULL, height integer null, width integer null, orientation character varying(5) NULL);');
// query4.on('end', function() { client4.end(); });

// var client4 = new pg.Client(connectionString);
// client4.connect();
// var query4 = client4.query('ALTER TABLE public.imageinfos ADD height integer null, width integer null, orientation character varying(5) NULL')
// query4.on('end', function() { client4.end(); });

// var client4 = new pg.Client(connectionString);
// client4.connect();
// var query4 = client4.query('ALTER TABLE public.posts ADD posturl character varying (100) NULL')
// query4.on('end', function() { client4.end(); });

// var client5 = new pg.Client(connectionString);
// client5.connect();
// var query5 = client5.query('DROP TABLE public.galleryimages; CREATE TABLE public.galleryimages(galleryimageid SERIAL PRIMARY KEY, galleryid integer NOT NULL, imageid integer NOT NULL, galleryimageordernumber integer NOT NULL, galleryimagecaption text NOT NULL,sizecontrollingdimension character varying(20) NOT NULL, sizecontrollingpercentage character varying(100) NOT NULL,  datecreated timestamp without time zone NOT NULL);');
// query5.on('end', function() { client5.end(); });

// var client6 = new pg.Client(connectionString);
// client6.connect();
// var query6 = client6.query('DROP TABLE public.postimages; CREATE TABLE public.postimages(postimageid SERIAL PRIMARY KEY, postid integer NOT NULL, imageid integer NOT NULL, postimagecaption text NULL,  sizecontrollingdimension character varying(20) NOT NULL, sizecontrollingpercentage character varying(100) NOT NULL, imagetype character varying(50) NOT NULL, imagetypeorder integer NOT NULL, datecreated timestamp without time zone NOT NULL);');
// query6.on('end', function() { client6.end(); });

// var client5 = new pg.Client(connectionString);
// client5.connect();
// var query5 = client5.query('CREATE TABLE public.postlayouts(id SERIAL PRIMARY KEY, layoutname character varying(200) NOT NULL, imagealt character varying(200) NOT NULL,caption text NOT NULL, caption text NOT NULL, datecreated timestamp without time zone NOT NULL);');
// query5.on('end', function() { client5.end(); });

// var client4 = new pg.Client(connectionString);
// client4.connect();
// var query4 = client4.query('CREATE TABLE  public.postcategory(postcategoryid SERIAL PRIMARY KEY, categoryname character varying(200) NOT NULL)');
// query4.on('end', function() { client4.end(); });

// var client4 = new pg.Client(connectionString);
// client4.connect();
// var query4 = client4.query('CREATE TABLE  public.tag(tagid SERIAL PRIMARY KEY, tagname character varying(200) NOT NULL)');
// query4.on('end', function() { client4.end(); });

// var client4 = new pg.Client(connectionString);
// client4.connect();
// var query4 = client4.query('ALTER TABLE public.imageinfos ADD imagebuylink character varying (500) NULL')
// query4.on('end', function() { client4.end(); });

// var client1 = new pg.Client(connectionString);
// client1.connect();
// var query1 = client1.query('CREATE TABLE public.advertisements (advertisementid SERIAL PRIMARY KEY, name character varying(200) NOT NULL, html character varying(2000) NOT NULL, advertisementtypeid integer NOT NULL, isdeleted boolean NOT NULL DEFAULT false, datecreated timestamp without time zone NOT NULL)');
// query1.on('end', function() { client1.end(); });

// var client2 = new pg.Client(connectionString);
// client2.connect();
// var query2 = client2.query('CREATE TABLE public.postadvertisements (postadvertisementid SERIAL PRIMARY KEY, postid integer NOT NULL, advertisementid integer NOT NULL, position character varying(100) NOT NULL, isdeleted boolean NOT NULL DEFAULT false, datecreated timestamp without time zone NOT NULL)');
// query2.on('end', function() { client2.end(); });

// var client3 = new pg.Client(connectionString);
// client3.connect();
// var query3 = client3.query('CREATE TABLE public.advertisementtypes (advertisementtypeid SERIAL PRIMARY KEY, advertisementtype character varying(200) NOT NULL, isdeleted boolean NOT NULL DEFAULT false, datecreated timestamp without time zone NOT NULL)');
// query3.on('end', function() { client3.end(); });

// var client4 = new pg.Client(connectionString);
// client4.connect();
// var query4 = client4.query('INSERT INTO advertisementtypes(advertisementtype, datecreated) VALUES($1, $2)', ["amazonimagelink", "2017-01-13 23:57:00 CST"]);
// query4.on('end', function() { client4.end(); });

var client4 = new pg.Client(connectionString);
client4.connect();
var query4 = client4.query('ALTER TABLE public.posts ALTER COLUMN postdate SET DATA TYPE timestamp with time zone');
query4.on('end', function() { client4.end(); });

var client5 = new pg.Client(connectionString);
client5.connect();
var query5 = client5.query("UPDATE public.posts SET postdate = postdate - ('6 hours'::interval)");
query5.on('end', function() { client5.end(); });


