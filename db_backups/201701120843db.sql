--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: galleries; Type: TABLE; Schema: public; Owner: nodeuser; Tablespace: 
--

CREATE TABLE galleries (
    galleryid integer NOT NULL,
    galleryname character varying(200) NOT NULL,
    isdefault boolean NOT NULL,
    isprivate boolean NOT NULL,
    datecreated timestamp without time zone NOT NULL
);


ALTER TABLE public.galleries OWNER TO nodeuser;

--
-- Name: galleries_galleryid_seq; Type: SEQUENCE; Schema: public; Owner: nodeuser
--

CREATE SEQUENCE galleries_galleryid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galleries_galleryid_seq OWNER TO nodeuser;

--
-- Name: galleries_galleryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodeuser
--

ALTER SEQUENCE galleries_galleryid_seq OWNED BY galleries.galleryid;


--
-- Name: galleryimages; Type: TABLE; Schema: public; Owner: nodeuser; Tablespace: 
--

CREATE TABLE galleryimages (
    galleryimageid integer NOT NULL,
    galleryid integer NOT NULL,
    imageid integer NOT NULL,
    galleryimageordernumber integer NOT NULL,
    galleryimagecaption text NOT NULL,
    sizecontrollingdimension character varying(20) NOT NULL,
    sizecontrollingpercentage character varying(100) NOT NULL,
    datecreated timestamp without time zone NOT NULL
);


ALTER TABLE public.galleryimages OWNER TO nodeuser;

--
-- Name: galleryimages_galleryimageid_seq; Type: SEQUENCE; Schema: public; Owner: nodeuser
--

CREATE SEQUENCE galleryimages_galleryimageid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galleryimages_galleryimageid_seq OWNER TO nodeuser;

--
-- Name: galleryimages_galleryimageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodeuser
--

ALTER SEQUENCE galleryimages_galleryimageid_seq OWNED BY galleryimages.galleryimageid;


--
-- Name: imageinfos; Type: TABLE; Schema: public; Owner: nodeuser; Tablespace: 
--

CREATE TABLE imageinfos (
    imageid integer NOT NULL,
    imagename character varying(300) NOT NULL,
    imagefilepath character varying(500) NOT NULL,
    imagetitle character varying(500) NOT NULL,
    imagealt text NOT NULL,
    datecreated timestamp without time zone NOT NULL,
    height integer,
    width integer,
    orientation character varying(5),
    imagebuylink character varying(500)
);


ALTER TABLE public.imageinfos OWNER TO nodeuser;

--
-- Name: imageinfos_imageid_seq; Type: SEQUENCE; Schema: public; Owner: nodeuser
--

CREATE SEQUENCE imageinfos_imageid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.imageinfos_imageid_seq OWNER TO nodeuser;

--
-- Name: imageinfos_imageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodeuser
--

ALTER SEQUENCE imageinfos_imageid_seq OWNED BY imageinfos.imageid;


--
-- Name: postimages; Type: TABLE; Schema: public; Owner: nodeuser; Tablespace: 
--

CREATE TABLE postimages (
    postimageid integer NOT NULL,
    postid integer NOT NULL,
    imageid integer NOT NULL,
    postimagecaption text,
    sizecontrollingdimension character varying(20) NOT NULL,
    sizecontrollingpercentage character varying(100) NOT NULL,
    imagetype character varying(50) NOT NULL,
    imagetypeorder integer NOT NULL,
    datecreated timestamp without time zone NOT NULL
);


ALTER TABLE public.postimages OWNER TO nodeuser;

--
-- Name: postimages_postimageid_seq; Type: SEQUENCE; Schema: public; Owner: nodeuser
--

CREATE SEQUENCE postimages_postimageid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.postimages_postimageid_seq OWNER TO nodeuser;

--
-- Name: postimages_postimageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodeuser
--

ALTER SEQUENCE postimages_postimageid_seq OWNED BY postimages.postimageid;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: nodeuser; Tablespace: 
--

CREATE TABLE posts (
    id integer NOT NULL,
    posttitle character varying(200) NOT NULL,
    postbody text NOT NULL,
    postdate timestamp without time zone NOT NULL,
    posturl character varying(100),
    postexcerpt character varying(500)
);


ALTER TABLE public.posts OWNER TO nodeuser;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: nodeuser
--

CREATE SEQUENCE posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO nodeuser;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodeuser
--

ALTER SEQUENCE posts_id_seq OWNED BY posts.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: nodeuser; Tablespace: 
--

CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO nodeuser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: nodeuser; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    encryptedpassword character varying(300) NOT NULL,
    email character varying(200) NOT NULL,
    lockedout boolean NOT NULL,
    loginattempts integer NOT NULL,
    isadmin boolean DEFAULT false NOT NULL,
    isverified boolean DEFAULT false NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO nodeuser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: nodeuser
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO nodeuser;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodeuser
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: galleryid; Type: DEFAULT; Schema: public; Owner: nodeuser
--

ALTER TABLE ONLY galleries ALTER COLUMN galleryid SET DEFAULT nextval('galleries_galleryid_seq'::regclass);


--
-- Name: galleryimageid; Type: DEFAULT; Schema: public; Owner: nodeuser
--

ALTER TABLE ONLY galleryimages ALTER COLUMN galleryimageid SET DEFAULT nextval('galleryimages_galleryimageid_seq'::regclass);


--
-- Name: imageid; Type: DEFAULT; Schema: public; Owner: nodeuser
--

ALTER TABLE ONLY imageinfos ALTER COLUMN imageid SET DEFAULT nextval('imageinfos_imageid_seq'::regclass);


--
-- Name: postimageid; Type: DEFAULT; Schema: public; Owner: nodeuser
--

ALTER TABLE ONLY postimages ALTER COLUMN postimageid SET DEFAULT nextval('postimages_postimageid_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: nodeuser
--

ALTER TABLE ONLY posts ALTER COLUMN id SET DEFAULT nextval('posts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: nodeuser
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: galleries; Type: TABLE DATA; Schema: public; Owner: nodeuser
--

COPY galleries (galleryid, galleryname, isdefault, isprivate, datecreated) FROM stdin;
3	Square Simplicity	t	f	2017-01-10 17:11:17
2	Future Punk	f	f	2016-11-23 00:32:06
1	Featured	f	t	2016-09-23 06:28:18
\.


--
-- Name: galleries_galleryid_seq; Type: SEQUENCE SET; Schema: public; Owner: nodeuser
--

SELECT pg_catalog.setval('galleries_galleryid_seq', 3, true);


--
-- Data for Name: galleryimages; Type: TABLE DATA; Schema: public; Owner: nodeuser
--

COPY galleryimages (galleryimageid, galleryid, imageid, galleryimageordernumber, galleryimagecaption, sizecontrollingdimension, sizecontrollingpercentage, datecreated) FROM stdin;
1	1	1	1		width	40%	2016-09-23 20:30:41
2	1	2	2	Organ Origin By AlmosLataan	width	60%	2016-10-02 06:08:23
3	1	3	3	Chicago Blue	width	60%	2016-10-06 07:07:18
8	1	8	5		width	50%	2016-10-27 15:35:07
13	2	13	0	no info	width	50%	2016-11-23 01:33:26
15	2	17	1	no info	width	50%	2016-12-10 08:18:22
14	2	14	2	no info	width	50%	2016-11-23 05:29:26
12	2	12	3	no info	width	50%	2016-11-23 00:38:00
16	2	18	4	no info	width	50%	2016-12-10 19:14:34
17	3	26	0	no info	width	50%	2017-01-12 02:26:13
18	3	27	1	no info	width	50%	2017-01-12 02:26:13
19	3	24	2	no info	width	50%	2017-01-12 02:26:13
20	3	30	3	no info	width	50%	2017-01-12 02:26:13
21	3	29	4	no info	width	50%	2017-01-12 02:26:13
22	3	25	5	no info	width	50%	2017-01-12 02:26:13
23	3	28	6	no info	width	50%	2017-01-12 02:26:13
24	3	31	7	no info	width	50%	2017-01-12 02:26:13
\.


--
-- Name: galleryimages_galleryimageid_seq; Type: SEQUENCE SET; Schema: public; Owner: nodeuser
--

SELECT pg_catalog.setval('galleryimages_galleryimageid_seq', 24, true);


--
-- Data for Name: imageinfos; Type: TABLE DATA; Schema: public; Owner: nodeuser
--

COPY imageinfos (imageid, imagename, imagefilepath, imagetitle, imagealt, datecreated, height, width, orientation, imagebuylink) FROM stdin;
14	Shiny-Box-Future-Punk	/uploads/Shiny-Box-Future-Punk.jpg	Shiny Box Future Punk	A monument of the future.	2016-11-23 05:29:02	1034	1379	L	\N
15	DVDcover-valhalla-rising	/uploads/DVDcover-valhalla-rising.jpg	DVDcover-valhalla-rising	The DVD Release cover for Valhalla Rising.  Depicts Mads Mikkelson as One Eye, astride the battlefield.	2016-12-03 07:25:55	500	356	P	\N
16	DVDcover-The-Wild-Blue-Yonder	/uploads/DVDcover-The-Wild-Blue-Yonder.jpg	DVDcover-The-Wild-Blue-Yonder	The dvd cover for Herzog's The Wild Blue Yonder	2016-12-03 07:33:04	500	338	P	\N
17	Christian-America	/uploads/Christian-America.jpg	Christian-America	A building forming a cross. Donald Trump's Christian America with all its abuses.	2016-12-10 08:17:56	804	1068	L	\N
18	Subway-Door	/uploads/Subway-Door.jpg	Subway-Door	Chicago Subway Door	2016-12-10 19:14:06	918	689	P	\N
1	Reality-Prisms_Fri Sep 23 2016	/uploads/Reality-Prisms.jpg	Reality Prisms By AlmosLataan	This collage art print depicts a fusion of realities and memory.  The futuristic print is in reference to the current discussions on simulated realities. The first layer to the print is the black and white photograph with the woman and the triangle structure. The second layer alters half of the triangle structure, thus representing simulated reality.  The final layer to the print is a color splash of three blocks of color that span both layers and realities, with the concentration on the woman and memory at the centre.  This is to highlight that it is not the truth of our reality which is important, but people, memory, and experience.	2016-09-23 20:30:41	\N	\N	L	\N
2	Organ Architecture_Sun Oct 02 2016	/uploads/Organ Architecture.jpg	Organ Origin By AlmosLataan	This is a manipulated architecture image which reveals at its centre a timeless man or humanoid being.  The reflection on the inside of the body may represent both ribcage and journey or event in the future.	2016-10-02 06:08:23	\N	\N	L	\N
3	Chicago Blue_Thu Oct 06 2016	/uploads/Chicago Blue.jpg	Chicago Blue By Almos Lataan	This is the accompanying image to the Chicago Blue poem.  It is a symmetrical image of the subway wall, which has a decaying panel.  The view of urban decay is something that is photographed often.	2016-10-06 07:07:18	\N	\N	L	\N
8	EventHorizon-2_Thu Oct 27 2016	/uploads/EventHorizon-2.jpg	Event Horizon By AlmosLataan	A spherical, consuming vortex representing a black hole viewed from its event horizon.	2016-10-27 15:35:07	\N	\N	P	\N
11	GodsGarden_Thu Oct 27 2016	/uploads/GodsGarden.jpg	God's Garden by AlmosLataan	Greek tiles sit above and below a dreamlike tree that would seem at place in the garden of eden	2016-10-27 20:51:24	\N	\N	P	\N
12	Chicago-Blue-Future-Punk	/uploads/Chicago-Blue-Future-Punk.jpg	Chicago Blue Future Punk	Chicago Blue Subway in a grunge, future punk style.	2016-11-23 00:37:40	574	918	L	\N
13	Polygons-Future_Punk	/uploads/Polygons-Future_Punk.jpg	Polygons Future Punk	Polygon glimpse into cyborg transcendence in Future Punk style.	2016-11-23 01:32:52	918	1377	L	\N
19	stair-parchment	/uploads/stair-parchment.jpg	stair-parchment	CHicago Subway Stair	2016-12-14 07:35:38	816	612	P	\N
20	Delphonic-Horizon	/uploads/Delphonic-Horizon.jpg	Delphonic-Horizon	An event horizon within an imaginary realm	2016-12-14 09:09:10	528	690	L	\N
21	Delphonic-Horizon-20161214	/uploads/Delphonic-Horizon-20161214.jpg	Delphonic-Horizon-20161214	An event horizon within an imaginary realm	2016-12-14 09:17:41	528	690	L	\N
22	Sleeping-Minds	/uploads/Sleeping-Minds.jpg	Sleeping-Minds	Sleeping Minds are wake to nothing.  This image is of a hilltop lochan in Scotland.	2016-12-14 20:09:02	717	1073	L	\N
23	Noir	/uploads/Noir.jpg	Noir	Americas Deep South is a film noir scene of disturbing conotations	2017-01-10 17:12:45	600	600	S	\N
24	eden-in-blossom	/uploads/eden-in-blossom.jpg	eden-in-blossom		2017-01-12 02:20:26	600	800	L	https://www.etsy.com/listing/469365704/edens-trees-in-blossom-print-pastel-tree?ref=shop_home_active_6
25	Andrei	/uploads/Andrei.jpg	Andrei		2017-01-12 02:21:02	600	800	L	https://www.etsy.com/listing/464540858/black-and-white-industrial-print-black?ref=shop_home_active_11
26	Simulation	/uploads/Simulation.jpg	Simulation		2017-01-12 02:21:37	600	800	L	https://www.etsy.com/listing/468812044/black-and-white-architecture-print?ref=shop_home_active_9
27	Lochan	/uploads/Lochan.jpg	Lochan		2017-01-12 02:22:15	600	800	L	https://www.etsy.com/listing/503561263/lochan?ref=shop_home_active_5
28	Face	/uploads/Face.jpg	Face		2017-01-12 02:22:47	600	800	L	https://www.etsy.com/listing/478017131/film-noir-print-surreal-b-movie?ref=shop_home_active_1
29	Noir-Square	/uploads/Noir-Square.jpg	Noir-Square		2017-01-12 02:23:28	600	800	L	https://www.etsy.com/listing/478017131/film-noir-print-surreal-b-movie?ref=shop_home_active_1
30	Stones	/uploads/Stones.jpg	Stones		2017-01-12 02:24:03	600	800	L	https://www.etsy.com/listing/464174794/standing-stones-print-scottish-highlands?ref=listing-shop-header-1
31	Weisner-Square	/uploads/Weisner-Square.jpg	Weisner-Square		2017-01-12 02:24:34	600	800	L	https://www.etsy.com/listing/478412303/architecture-print-pop-art-print?ref=shop_home_active_10
\.


--
-- Name: imageinfos_imageid_seq; Type: SEQUENCE SET; Schema: public; Owner: nodeuser
--

SELECT pg_catalog.setval('imageinfos_imageid_seq', 31, true);


--
-- Data for Name: postimages; Type: TABLE DATA; Schema: public; Owner: nodeuser
--

COPY postimages (postimageid, postid, imageid, postimagecaption, sizecontrollingdimension, sizecontrollingpercentage, imagetype, imagetypeorder, datecreated) FROM stdin;
11	12	23		width	50%	Main	0	2017-01-10 17:13:03
6	7	15	<a href ="https://www.amazon.com/gp/product/B007O5N4L6/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=almos02-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B007O5N4L6&linkId=faf978d94a633a57dc1cba439a178c4a">Buy on Amazon here</a>	width	50%	Main	0	2016-12-03 07:27:21
2	5	3	Chicago Blue by AlmosLataan	width	50%	Main	0	2016-10-06 07:08:15
7	8	16	<a href ="https://www.amazon.com/gp/product/B000IJ7AJC/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=almos02-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B000IJ7AJC&linkId=5a8ef97dfc7d4f3bf01fa3e61cab5086">Buy on Amazon here</a>	width	50%	Main	0	2016-12-03 07:33:46
9	2	19		width	50%	Main	0	2016-12-14 07:35:54
5	6	21		width	50%	Main	0	2016-10-27 15:35:59
1	4	1		width	50%	Main	0	2016-09-23 20:30:59
8	9	17		width	50%	Main	0	2016-12-10 08:28:45
10	10	22		width	50%	Main	0	2016-12-14 20:09:17
\.


--
-- Name: postimages_postimageid_seq; Type: SEQUENCE SET; Schema: public; Owner: nodeuser
--

SELECT pg_catalog.setval('postimages_postimageid_seq', 11, true);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: nodeuser
--

COPY posts (id, posttitle, postbody, postdate, posturl, postexcerpt) FROM stdin;
2	Transition	To think that at one time, the mere act of watching another person draw something for you was enough to stir from within a strange yet wonderfully warm and mesmeric glow that seemed to rise up and envelope your entire being in radiance.  This feeling occurred abundantly as a child, yet its frequency gradually diminished over time, eventually leading to its complete disappearance by the time teenage years arrived.  It seems that the body or soul became so accustomed to this deeply personal and interrelated experience that the feeling eventually became extinct, leaving only a trace memory of what was once a completely unique and spellbinding emotion.\r\n\r\nThroughout life, it seems that many feelings, pursuits and intensities can be rendered numb or obsolete, but fresh approaches and perspectives arrive to take their place.  Sometimes, it can be hard to let go of what was once a part of yourself, but perhaps these metamorphoses are needed in order to grow in life, rather than stagnate.  After all, no one can know exactly what our true purpose is as individuals.   And sometimes life events will bare something to you in such stark terms that a clarity descends, and you see much of the truth of things, at least from the perspective of your own existence.\r\n\r\nAnd so it is has become with photography.  Life’s lessons and exposures have diminished much of the initial glow of looking through that frame.  Time feels short, and guilt makes its presence felt in what appears to be ever diminishing windows of time.  Suddenly many things seem empty where once they were full.  Rather than viewing directly the veil, you  instead peer through it to a new reality in the distance.  The superficiality of so much becomes clear, but this leaves space for something far greater, and that is those matters which have dwelt long on the periphery, yet should always have been centre stage. \r\n\r\nIt is from this position that events must commence.  Nature, and the world itself through the looking glass, have truly given some of life’s greatest gifts.  But more so than that have people, and there arrives a moment in time when there blooms a burning desire to try to give something back, to reflect on more than just that which resides on the surface, to find the true nature of how things should be and reveal it.  A camera and lens can still achieve this, but it is a far greater struggle to create, than it is to record that which already exists. \r\n\r\nThe purpose of this blog, then, will be to document this journey as far as possible, to hopefully record moments when true purpose is found, but perhaps also to record when failure occurs, as it is a hard thing to find purpose in art without giving rise to such negatives as vanity and pride, and it is also hard to keep the aspidistra flying whilst staying true to one’s purpose.  So judge a person not by their wares, but by what they wish their wares to be, and perhaps at some point this will be realised.\r\n	2016-08-29 06:16:46	Transition	Paradoxically, it is the all-emcompassing dark that provides the greatest of illumination..
4	Simulated Reality and Religion	Watching all around, the people of the world continue in their day to day tasks.  The gardener still uproots his weeds; still caresses his geraniums.  Builders still lift their blocks, worker bees to their architect queen.  Artists still paint their lovingly detailed landscape snapshots.  And teachers still teach children the scientific laws that underpin our reality.  \r\n\r\nBut what reality is that exactly?  For a long time now, a philosophical idea has been brewing on the periphery, tantalisingly close for those who keep an ear to the wind.  Slowly, it has encroached closer and ever closer, before finally perforating our popular culture.  First we had Rainer Werner Fassbinder’s, <a href=" http://www.imdb.com/title/tt0070904/">World on a Wire</a>.   Then came <a href="http://www.imdb.com/title/tt0118929/?ref_=fn_al_tt_1">Dark City</a>, then <a href="http://www.imdb.com/title/tt0139809/?ref_=nv_sr_1">Thirteenth Floor</a>, and finally the <a href="http://www.imdb.com/title/tt0133093/?ref_=nv_sr_1"> The Matrix</a>.  All have in common their ancestral route, <a href="https://en.wikipedia.org/wiki/Simulacron-3">Simulacron-3</a>, a sci-fi novel written by <a href="https://en.wikipedia.org/wiki/Daniel_F._Galouye">Daniel F. Galouye</a> in 1964.  They all concern protagonists who find themselves in realities which begin to unsettle them.  Slowly, it becomes apparent that perhaps their reality is not the true reality at all, and from this there grows the urge to escape, or reality hop.\r\n\r\nThere is a reason why these books and films are successful.  Throughout time and history, a subconscious thought seems to have pervaded all peoples and cultures, and that is that reality may not be all that it seems.  But what can possibly be the cause for such an initially outrageous thought which is at odds with all objective observation?  Certainly, the encroaching threat of mortality may be an explanatory driving force behind this niggle.  The concept of not existing at all is a concept so beyond our capacities that perhaps we are driven to manifest alternate realities in order to ensure our continued existence. \r\nThe reality niggle may also be explained by a subconscious solipsism at work, through the inability for any of us to truly see beyond ourselves as manifestations of reality.  Certainly, the countless wars and depictions of the dead or starving do little more than to elicit from us fleeting groans of despair.  They certainly don’t seem to elicit the kind of response that causes us to stop and try to change things, rather than pandering to a consumerist machine that lines the pockets of corporate behemoths (although initiatives like <a href="http://money.howstuffworks.com/personal-finance/budgeting/how-much-budget-to-charity.htm">giving 10% of our wages to charity</a> can help to put things on the right path). \r\nOr could the reality niggle be explained by something more positive: that we are just intrinsically in tune to the fact that existence is infinite?\r\n\r\nReality of course, has always been on the lips of most religions, or should we say, the lack of reality.  Christians believe that our existence here is the precursor to the big event, with our actions in this reality being of great importance.  Muslims of course share similar beliefs, as do all the Judaic religions.  Buddhism is a bit more clear on what it views our current reality as, and that is as an illusion, where nothing is really real, and everything has emptiness at its source. \r\nSurprisingly, Science itself may now be coming to similar conclusions, perhaps giving atheists their own form of religion.  Although this idea has been toyed with for a while (think Plato’s <a href="https://en.wikipedia.org/wiki/Allegory_of_the_Cave">Allegory of the Cave</a>) it is only now with the advent of computing that mainstream science is beginning to formulate its own theories.  Without even needing to go into discussions on quantum physics and collapsing wave functions, it seems that scientists are arriving at a bit of a conundrum as computing power and artificial intelligence research increase.  The problem is this:  If we, as a species, manage to create true artificial intelligence (a sentience - a being with conscious thought), then the likelihood is that at some point we, or even the artificial intelligence itself, may go on and attempt to simulate how these intelligences interact with each other through a virtual simulation.  As our capabilities and computing power increase, we will soon start to see these virtual worlds reflect our own.  \r\n\r\nConsidering this, it is easy to see the horrifying truth.  That is, if this scenario is indeed possible, then what is the likelihood that our own reality is a simulation?  Not necessarily an energy farm like in the Matrix (although this isn’t necessarily unfeasible), but more akin to the world (or worlds) depicted in World on a Wire.  Realities within realities, perhaps infinite.  What then, is the true reality? \r\n\r\nIf all of this is a little too much to believe right now, then it may be prudent to listen to some of the world’s most proficient intellectual minds. <a href="https://en.wikipedia.org/wiki/Elon_Musk">Elon Musk</a> (engineer, inventor, investor) believes that the chances of our reality being the “true” reality are billions to one (you can see the full video <a href="http://www.independent.co.uk/life-style/gadgets-and-tech/news/elon-musk-ai-artificial-intelligence-computer-simulation-gaming-virtual-reality-a7060941.html">here</a>).  He is not the only prominent individual to discuss this idea.\r\n\r\nHowever, Musk has failed to discuss a couple of further “options” or additions to the argument.  Firstly, there is the presumption that we will be able to manifest consciousness within a simulated environment.  This is similar to the age old question of whether it is actually possible to create an Artificial Intelligence at all.  The main problem associated with this is that scientists don’t really know what consciousness is (<a href="https://www.theguardian.com/science/2015/jan/21/-sp-why-cant-worlds-greatest-minds-solve-mystery-consciousness">The Consciousness Mystery</a>).  Is consciousness a manifestation of matter, or does it exist beyond this?  With this conundrum in mind, it seems it will be very difficult for scientists to a) firstly create artificial intelligence, and b) know and prove that they have indeed created it.  The second statement may never have an answer, even if we <i>think</i> we have achieved the first. Perhaps, then, it is quite the leap to rate the chances of living in a simulation so highly.\r\n\r\nBut even if we are living in a “simulation”, how does this <i>really</i> affect everyone?  Well, the short of it is this: If we are already living in a simulated reality, then we are already being affected by it right now, and so things don’t really change too much. Unfortunately, at least from a scientific perspective, the reality hopping depicted in World on Wire and the Matrix is unlikely to be possible, as the rules of our world, much like in a computer game, will be set and unbreakable.  However, computer games have glitches, and that is what scientists are currently trying to discover, can they find a glitch that will prove that our reality is a simulation?  \r\n\r\nWhat will be the world’s reaction if they are successful in finding such a glitch?  Well, despite Science’s enduring reluctance to credence religions, many people will most likely take solace in the idea that they have already long since embraced the idea of a reality beyond our own, with this being the afterlives and heavens stated in most religions, with the permanence that spans across these realities being the human soul.  Perhaps this latest twist in Science is the result of the great benefactor in the Sky anticipating the great religious apostasy that would occur, and hence a failsafe has been "inserted" in order to cast people’s eyes back to religious ideals.  After all, the world is so quick to jump at religious failings that it forgets that society is historically, at least in the West, a primarily Christian society whose values, beliefs, and morals have in their underpinnings the original morals stemming out from Christianity and Judaism.  In the East, Buddhism teaches similar values of humanity and caring. It is hard to overstate the importance these religions and movements have had in creating and maintaining a more just society throughout the ages. A world without religious dogma may in fact become a very dangerous place for those who are not born strong or rich, and this even more so in the future with the advent of diminishing world resources and the rise of technologies that may no longer need the administration of human beings.  In that future, many may be glad if religious dogma has avoided death and contamination.  \r\n\r\nSo from today’s day forward, what really matters?  Well, everything.  It is still important to uproot those weeds, and lift those blocks, and teach those children, because this is our reality right here, and we need to live it, feel it, and protect it for those living now and in the future.  If we can do that responsibly and with less selfishness, then perhaps our souls will indeed transcend the void and reunite us with those loved and lost in realities beyond.  \r\n	2016-09-23 20:25:23	Simulated-Reality-and-Religion	Are we songbirds in cages, or songbirds in cages within a painting?  \r\n\r\nDoes the songbird makes prisons and death for his fellows too?\r\n\r\nFor reality to bear unto us its riches, perhaps we need to prove worthy of adornment..
7	Valhalla Rising Review and Analysis	Sometimes, watching a slower film can feel like effort spent, especially in the modern era of film, which relies heavily on the new conventions of frenetic pacing and sensory overload.  However, a slower film is not only often more considered, but is designed in such a way so that the viewer considers also.  And so the 'effort' is eventually well spent, as the viewer reaps the reward of an enriched message or life perspective. <a href="http://www.imdb.com/name/nm0716347/?ref_=sr_1">Nicolas Winding Refn’s</a> Valhalla Rising is a modern, slow film, but unusually, it doesn't seem to suffer from the <i>extra effort</i> problem. This is perhaps due to the brief, but sporadically interspersed violence (of the graphic kind), which acts as a brief waking jolt from the trance like states you have slipped into. Or maybe it’s the trance like state itself, which has been brought about by a compelling blend of sound and imagery that accompanies almost every scene without dialogue, with these numbering many. It’s a similar balance that is found in <a href="http://en.wikipedia.org/wiki/Takeshi_Kitano">Takeshi Kitano’s</a> <a href="http://www.imdb.com/title/tt0119250/">"Hana-Bi"</a>, although both films have a very different feel to them, with Hana-Bi at its centre being very much a humanist story, whereas Valhalla Rising is more of a metaphysical journey.\r\n\r\nIts IMDB rating (at time of print, 5.9) would indicate a distinctly mediocre film, but this is far, far from the truth. The rating appears to have suffered for a number of combined reasons. Firstly it is about Vikings, secondly it is English speaking, and thirdly, it is slow and pensive. The first two reasons have brought with them an audience with a thirst for blood, with this being left largely unquenched apart from a few intense and graphic scenes of violence. Certainly, there are no berserking, barbaric hoards battling godforsaken Nordic demons from the underworld. Instead, the battles are waged within the men themselves, with dialogue as well as action kept to a bare minimum. This allows other parts of the film to come to the fore, namely the outstanding cinematography and soundtrack, which blend into each other creating a symbiosis of oppressive, menacing, and unsettling tension throughout.\r\n\r\nThe cinematography (<a href="http://www.imdb.com/name/nm0845612/">Morten Søborg</a>)\\r\\nitself is quite distinctive. There is a large concentration of close-up facial portraits highlighting the worn and weathered faces. For a film with little dialogue, it is these shots which are left to inform us of the characters’ thoughts and intentions throughout, this being particularly true of “One Eye”, the film’s main protagonist (played superbly by Mads Mikkelsen) who is mute the whole way through. The camera is also used unusually to create mood through a slow motion panning movement across near statuesque characters to give a feeling of time <em>almost</em> halting, but the effect is subtle and doesn’t feel gratuitous. There are also sudden cuts from the Viking group to images hailing from dreams or nightmares, such as the upside down view of a crimson river at peak flow. These unexpected images knock you off balance whilst at the same time sucking you in to this bizarre and terrifying vision.\r\n\r\nIn terms of sound, the electronic sound-scape from <a href="http://www.imdb.com/name/nm1190004/">Peter Kyed</a> and <a href="http://www.imdb.com/name/nm0676238/">Peter Peter</a> is never anything less than surreal and intimidating. Like Apocalypse Now before it, the electronic nature of the music allows the sounds to take on a very inhuman quality, often contributing to an effect of delirium in the scenes. However, sometimes the manufactured sound is dropped, and instead we are left only to the sounds of the natural environment. This is employed brilliantly for the opening chapter, which opens in the barren wastes of northern Scotland, where the film’s only sounds are that of raging, swirling winds tearing up through the gullies and valleys, at some points rising to that of a constant, pounding, thunder. The camera is used to confirm these sounds through a series of powerful, reverberating landscape shots, such as a view of the opposing hills being ridden by fierce, marauding columns of low level cloud. As the film points out at the beginning, we are truly at the edges of the world here.\r\n\r\nThe characters themselves are just as hardy and weathered as the mountain rocks themselves, with their expressions never once beginning the formation of a smile, or indeed of any form of tenderness. They seem constantly to be wearing the grim look of necessity, with this expression only ever being punctuated by madness, rage, wickedness, or despair. It is a bleak and dark journey.\r\n\r\nThe film’s opening titles introduce the viewer to a world where Christianity has pushed the pagan faith to the outer reaches of the world, converting the many of the Vikings with it, but not all. It is here that the film starts, with a slave fighter, “One-Eye”, who manages to break free from his enslavers, slaying each in turn before attempting to move off alone. However, the young boy who has fed, and to a degree looked after him until now, follows One Eye, and the two form a silent and slightly confused companionship. Upon crossing a band of Christian Vikings, they are offered a chance to gain land, riches, and a cleansing of their souls through a crusade to the Holy Land of Jerusalem. They take up this offer, but end up in a nightmare New World that some group members believe to be hell.\r\n\r\n<strong>ANALYSIS (contains spoilers)</strong>\r\n\r\nThe lack of dialogue or explanations in this film lends well to it’s ambiguity with regards to meaning and intention. Certainly, from a non-Nordic and non-Christian background, the film will be nigh impossible to draw conclusions from. However, analysis of One-Eye and who and what he represents proves to be revealing. His identity is hinted at through a number of clues. Firstly, there is his missing eye. Secondly, there is the fact that he appears a supernaturally gifted warrior, who, in the pagan priest’s own words, has been raised from hell. And thirdly, there is the film’s title, “Valhalla Rising”, with Valhalla being a hall in the Nordic version of heaven. One Eye, then, is surely a reference to the Nordic God of Wisdom and Poetry, and ruler of Asgard, Odin, who himself sacrificed an eye in the <a href="http://en.wikipedia.org/wiki/M%C3%ADmir%27s_Well">Well of Mímir</a> for the gift of a new form of perception. One-Eye displays this perception throughout the film, as he is given blood red prescient visions of future events that seem always to come to fruition. The difficultly with his character is that this isn’t all that he seems to represent… As a Viking god, One Eye’s initial behaviour is quite fitting. In a slave gladiatorial role, he is brutal, savage, and seemingly invincible as he destroys all of his opponents. We later learn that he is no normal fighter; that he is passed from tribe to tribe after a period of years; and it is implied that he has been raised from hell. This is later confirmed by a pagan priest. His subsequent escape and butchering of his captures gives rise to a monologue from the clan chief, informing us that One-Eye is invincible due to the raging torrents of hatred that course within him. Following this, though, there start a number of subtle changes. As One-Eye is essentially mute, it seems important to analyse his expressions and reactions. The first hint of an inner change is his acceptance of the young, blonde boy child as a companion. Although nothing is said, it is perhaps the first indicator that the man is not pure fury. A more telling indicator appears later as the Christian priest attempts to convert him to the cause of the crusade.  <em>“We are more than flesh and blood. More than revenge. All of these things go… You should consider your soul. That is where the real pain lies.”</em>\r\n\r\nAt this statement, One-Eye turns his head to stare intently at the priest, which is something of a strange gesture at this point, since One-Eye having remained largely distant so far. The scene that follows this has One-Eye, boy, and Christian Vikings all on the longboat to Jerusalem. It would appear that the priest’s words have had some sort of an effect, but we are left to deliberate why. It’s possible that we are viewing a softening or minor conversion here.\r\n\r\nAt the merger of the two groups (One-Eye, boy and Viking Christians), it is also important to view exactly how the Christians themselves are depicted. Already, there have been negative references to their growing influence in the world, firstly though the opening narrative, and secondly with the references made by the traders as they discuss ownership of One-Eye, with the opposing trader citing that the clan chief will need money in order to hold influence with the Christians (this being one of the first hints of corruption). As One-Eye and the group meet, we are given further fleeting views of what it means to be a Christian in these times: a burning pyre of dead bodies; and huddled together, a group of unclothed, enslaved, women. This scene is filmed as twilight approaches night, and in combination with the previous images, the mood is one of minor menace and tension. It’s clear that the Christians are not being depicted in a positive light, and this theme continues throughout the film.\r\n\r\nOn the boat, there are two main incidents that result from the situation of being stranded at see. Firstly, there is an attempt by the Christians to make a move on the boy’s life. The relationship between One Eye and the boy has been unclear up until now, due to the distance One Eye maintains, but his instant defence of the boy here is the first ‘good’ act we perceive him to perform. It also highlights the Christians’ superstitions, weaknesses, and hypocrisy. Secondly, there is the One-Eye’s discovery of freshwater which signifies they are on a river. As he passes the flask to one of the Christian’s to drink, there is more than a hint (considering the subject matter) of Jesus and the water to wine miracle, with here the miracle being salt water to freshwater. This appears to be the first of a number of Christ references.\r\n\r\nThe rest of the film is spent in the New World, most probably North America somewhere, but it is also indicated that the men may in fact be in Hell, and that One-Eye has lead them there. The most interesting points really come at the end of this chapter, after the group has been severely depleted at the hands of the unseen locals. From here on in, it is becoming apparent that there is a rebellious faction growing within the group, led by the leader’s son, who is himself a very ‘Judas’ like character. Increasingly, One-Eye is looked upon as some form of leader by the rest. In one particular scene, the Christian leader chooses to give the flagon of mysterious substance (presumably alcohol or hallucinogen) to One-Eye before even that of his son. This “Passover” marks the beginning of events leading to the great divide. Just prior to this, One-Eye has a vision of a death on a mount at the hands of natives, with this death appearing to be his own. Then, following the drinking of the hallucinogen, the men all appear to fall into an introspective hypnotic state, where each faces the darkness and is tested. This scene has strong associations with the Bible’s chapter on the Garden of Gethsemane, and the night that follows this. It seems that only One-Eye passes this test, fashioning what appears to be some form of strange standing stone monument. He later appears to ‘rise’ from this following death, and so the scene is perhaps an indicator of One Eye accepting his death to come (as Jesus did), and preparing for it.\r\n\r\nThe divide occurs, and the group dwindles to just four, One Eye, the boy, and two followers. The final scenes seem appears in keeping with Christ’s final path up Golgotha to his own death, and to highlight this, One Eye lifts the struggling boy to place him upon his back, thus giving us the physical image of the cross. By this point, we realise that the boy has always been his cross through being his responsibility. Just prior to One Eye’s self sacrifice, he gives his other two followers the peace that they need to die well, and we are informed that the boy will survive the ordeal to build a boat and go home.\r\n\r\nAt this point, One Eye goes willingly to his death, seemingly in exchange for the boy’s life. As a final nod to Christ, it is implied that One Eye himself arises again from his standing stones to return in spirit form to the hills of Scotland where we started.\r\n\r\nSo, a Viking film which appears to be mainly referencing Christ? The film ending appears very confusing. At first the Christ references feel coincidental, but by the end of the film there can be no doubt. What perhaps isn’t so clear at this point is Nordic religious history, and particularly that of <a href="http://en.wikipedia.org/wiki/Odin">Odin</a>, who, as a God, pierced himself with a spear, and then sacrificed himself to himself on the world tree Yggdrasil in order to gain wisdom. It is also said that he passed through the Dead World, to arise again with new knowledge. Biblically, of course, Christ himself was God the Son, and sacrificed himself in order to free the righteous from hell. He was also pierced by a spear.\r\n\r\nThese are two remarkably similar episodes, even considering the differences in motivations of the two Gods. Deeper reading of Nordic history reveals that it is debateable how much of the current story of Odin comes from the pre-Christian Nordic culture, and how much of it comes from the ‘fusion’ as the Christians arrived in Scandinavia (see <a href="http://sciencenordic.com/medieval-texts-colour-our-knowledge-about-odin"> Medieval texts colour our knowledge about Odin</a>). It seems that the method of Christian evangelising departed a lot from “truth” per-se, and instead chose the unified spread of the Christianity itself as paramount. In order to meet the least opposition, a method of doing this would be to convert the pagan Gods and customs into Christian customs instead (LINK). And so in this way, Odin became Christ to a degree, and the hammer of Thor would become the cross, etc (see <a href="http://donlehmanjr.com/Politics/politics%2006/politics%2006f.htm"> the interaction between Norse mythology and Christianity</a>), and the pagans could in a way have both for a time. And it is here that Valhalla Rising begins to make sense.\r\n\r\nIt seems that One Eye, as Odin, represents the old Norse mythology slowly being converted and fused into a new Norse faith with a more Christ like figure at the centre. He starts off savage, brutal, and immensely powerful, burning with vengeance, but begins to take on distinctly more Christian qualities following the initial discussion with the Christian priest, with this conversion continuing the whole way up to the point of sacrifice. But he is never fully “Christ” – he is never seen to pray, he still kills in defence, and he rises again from pagan standing stones. So, as already mentioned, he represents the fusion that Nordic religion underwent as the Christian preachers first arrived, and then eventually religiously conquered.\r\n\r\nOf course it isn’t quite as simple as this, as we also have the sub-theme of organised Christianity itself, as represented by the Viking group, and their thoughts and actions. Their purpose appears to be to cast a damning light on the Christian movement of this age, questioning their conversion tactics, their lack of acceptance for other faiths, and their motivations. They are also there to represent the weakness of man himself, with his inability to cope with his own corrupt desires and needs, with “faith” often being driven by selfish motivations. And it is these negative qualities that deviate from true faith and religion and end up corrupting organised religion. So in a fashion, the film contrasts the ideological beginnings of a religion with the monstrosity that it can eventually become.\r\n\r\nFinally, it seems important to point out that this is a difficult film to interpret with any degree of surety. Perhaps the director’s greatest intention with leaving One Eye mute was for the ambiguity this would undoubtedly bring, encouraging viewers to go forth and read further and deeper into Nordic culture, and how was it influenced by influx of Christianity. If this was the intention, then it is a trick that has hopefully worked.\r\n\r\n<a href ="https://www.amazon.com/gp/product/B007O5N4L6/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=almos02-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B007O5N4L6&linkId=faf978d94a633a57dc1cba439a178c4a">Buy on Amazon here</a>	2016-12-03 03:41:50	Valhalla-Rising-Review-and-Analysis	Nicolas Refyn takes us to the edges of not only the world, but humanity itself, as a nightmare vision is painted red into our conscious.  But where there is darkness, one can also find light..
5	Chicago Blue	Walking down Chicago Blue,\r\nSo fix me up your decay,\r\nFix me up, Fix me down,\r\nBut fix me not the beggar’s sound,\r\nWhose dreams are more today.	2016-10-06 07:03:26	Chicago-Blue	What dreams are there for those beyond dreams? 
8	Herzog's The Wild Blue Yonder Review and Analysis	When a film is genre labelled “Science-Fiction”, it can give the impression to the viewer that they are about to watch something along the lines of 2001, Solaris, or more recently Moon, with space being the backdrop, and the plot revolving around hot topics such as, ‘the purpose of existence’, and ‘what defines life?’.\r\n\r\nHerzog’s approach is, predictably, rather different.  Having seen the bare but intriguing Kasper Hauser, the slow but epic FItzcarraldo, and the bizarre, difficult, and quite un-enjoyable Heart of Glass, there was no danger of inflated sci-fi expectation bubbles being burst here.  Instead, there was only intrigue as to how Herzog would approach the genre.\r\n\r\nThe basic plot premise is the story of human exploration into space in the search for a habitable planet following a worrying discovery from earth.  This is narrated by Brad Diouf, who himself plays an alien that has previously arrived on Earth following his own race’s abandonment of their home planet for environmental reasons.  Although this may sound quite exciting, it is really the entirety of the plot in one gasp, and the performance from Diouf as a disenchanted, bitter alien, borders on the slightly ridiculous, although perhaps this is caricaturing America’s rural, desert dwelling crackpots that believe they’re from outer space.\r\n\r\nDespite this, the film’s strengths lie in the dreamlike journey that he starts us on, with real life NASA footage of astronauts in orbit being used to begin the fictional tale.  The footage is interesting to watch, and although not much happens in the scenes depicted, the marvel of watching their weightless movements throughout the ship can’t help but draw you in.\r\n\r\nInterspersed between this and Diouffs narrative is footage of stars, cloud clusters, and star systems, all shot in yellows, reds, and greens.  Although brief, the colours and music add to the sensory mood, and move the audience nicely into the film’s outstanding section: the exploration of The Wild Blue Yonder, an alien world deemed habitable for human life.  The footage for this is taken from what is probably the Artic, with the divers descending into the freezing waters through a roof of ice.  The camera is centred the majority of the time looking up at the ice roof, with the light coming through producing all manner of dreamlike colours which melt into each other and give the appearance of a darkened sunset sky.  As the camera pauses, along come currents of fantastic slivers of ice, floating and flowing throughout the whole frame, providing the entrancing feeling of watching snowfall dancing under water.  The music accompanying this accentuates the feeling of otherworldliness, being a strange combination of a classical score fused with lilting, African singing.  It is quite the feast for the senses, as are all the scenes from here to the end of the film when our explorers arrive back at the new and wondrous earth.\r\n\r\nThe purpose of most Science-Fiction is to usually leave the audience ponderous about some great philosophical question about our existence in the grander context of the universe.  However, Herzog appears to use man’s quest for the stars and the great unknown as a vehicle to celebrate what we have right here, planet Earth, showing us the height of its great and mysterious beauty, whilst questioning our attitudes towards it and its inhabitants.  Via the diver’s indifference towards the blue yonder’s simple jellyfish like creatures, Herzog highlights the irony of dreaming about alien life forms in space whilst largely ignoring and destroying our own.\r\n\r\nThere are also gentle musings about what the future may bring for humanity, with one scientist’s view that perhaps we’ll all residing in asteroid belt colonies in space, in order to mine the abundant and precious metals and minerals.  Our living quarters would reside within massive space mall complexes that cater for our every need, with the earth existing only as a wondrous, luxurious, and probably expensive holiday destination.  Whilst not the most exciting or original view to the future, it is Herzog’s way of rattling our heads with his knuckles in the hope that we can take in what a blessed and inspiring world we have amongst the deadened and hostile lumps of rock and deadly gas that populate our immediate vicinity.  He is trying to address our own disharmony toward the beauty of nature, questioning why do we follow the paths we do, why did we need to create civilisation in the first place, and why do we constantly look beyond that which we already have, no matter how wondrous.  Of course, this itself is nature at work within ourselves, and so Herzog’s portrayal of events in the film are his exasperations at the inevitability of things to come, and the forces that drive us down these paths (with chaos being referenced throughout).\r\n\r\nAltogether, it is an interesting, and at times, beautiful film, but not great if viewed in a comparative sense with other ‘great’ science fiction films like 2001.  But this is kind of Herzog’s point again – why do we froth with such curiosity and anticipation for the great unknowable in the universe?  Why do we march ever on into its blackened abyss, when right here we have all of the splendour we should ever need? \r\nIt is not an easy question to answer.\r\n\r\n<a href ="https://www.amazon.com/gp/product/B000IJ7AJC/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=almos02-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B000IJ7AJC&linkId=5a8ef97dfc7d4f3bf01fa3e61cab5086">Buy on Amazon here</a>	2016-12-03 06:17:30	Herzog's-The-Wild-Blue-Yonder-Review-and-Analysis	Werner Herzog delves under frozen wonderlands to deliver a sci-fi unlike any other. As provocative as always, but this time with scenes of such majestic beauty that we must surely have been transported onto the periphery of spacetime itself
6	The Artificial Intelligence Apocalypse	The black hole is perhaps the most enigmatic of all space-time structures. The most destructive, cataclysmic bodies known to man, they are the end of all matter, but perhaps also the birth as well. Obscured for millennia, masked by their own obliteration of light, they were only first theorized this century, and only “observed” for the first time very recently. Their presence sits as a terrifying reminder of mortality and oblivion, an end to time, to love, and to the irrelevance of many of our lives. Strangely, the same century has given light to two other dark, apocalyptic forces. Firstly, the nuclear bomb. Stemming indirectly from Einstein’s Special Theory of Relativity work in 1905, the world soon knew the horror of Hiroshima and Nagasaki, as it drifted into a cold war and a new human era that would be defined by an ever present threat to the end of all earthly existence. \r\n\r\nChillingly, it seems that another event horizon may recently have been passed. Unseen prior to Turing and the birth of the computer, the next great existential threat may be the coming of Artificial Intelligence. At least, this is what we are being told. \r\n\r\nFrom the date of the first computer program, people began to wonder whether a machine could become intelligent.  Alan Turing, whose brilliance led to the Enigma Machine and the first computer, also created the <a href="https://en.wikipedia.org/wiki/Turing_test">Turing Test</a>, which was envisioned in order to measure whether a computer had become intelligent enough to become indistinguishable from a human being (from the perspective of the human of course).  Marvin Minsky then founded MITs AI Laboratory in 1959, and from that point investigations have been ongoing.  Science fiction has covered the topic extensively, through Philip K Dick, and perhaps most famously with Arthur C Clarke’s 2001, which was brought to the mainstream with Stanley Kubrick’s masterful cinematic adaptation.  \r\nThe perils have certainly been well documented, and yet it seems that society is set on seeing AI through to fruition.  Of course, for the majority, AI has always remained a pipedream, and a rather fanciful one at that.  But recent advances have caused the world and its usually ever sceptic scientists to take note. The first big event was in 1997, when IBMs computer <a href="https://en.wikipedia.org/wiki/Deep_Blue_(chess_computer)">Deep Blue beats reigning Wold Chess Champion Garry Kasparov</a>.  It was a seminal moment that illustrated the power of AI in a way that normal people could understand.  Essentially, the best of mankind had been beaten by a machine, and this was only the start of computers.  More recently, a similar event occurred whereby <a href="https://www.wired.com/2016/01/in-a-huge-breakthrough-googles-ai-beats-a-top-player-at-the-game-of-go/">Google’s Deep Mind beats Fan Hui at Go </a>).  This was significant as Deep Mind’s Go repository was built through AI learning techniques, ground up, rather than having thousands of moves and strategies pre-programmed in, as with Deep Blue and its win against Kasparov.  So now there is the advent of actual learning, not just human knowledge being transferred to a larger and faster memory bank.  This deep learning style has also been instilled into processes at Facebook and Google for facial and general image recognition.  The potential benefits to this are huge if left to the creation of beneficial aids to humanity.  The advent of self drive cars is also close.  However, it is not the creation of these aids and automation that concerns most.  Instead, it is the steadily growing belief that that is may be possible to create through machines a free thinking artificial intelligence.  A sentient being.  \r\n\r\nFuelling these thoughts are ongoing work on AI, and most importantly, the human brain.   There is a suspicion among some scientists that our brains are simply just incredible biological supercomputers, and as such, if we can recreate the brain artificially, then we will also recreate intelligence itself.  Projects such as <a href="https://en.wikipedia.org/wiki/BRAIN_Initiative">Obama’s Brain Initiative</a> are helping towards this by mapping the functional areas for the brain , and futurists such as Ray Kurzweil believe that these initiatives may help realise the “dream” of true Artificial Intelligence within a century.  Of course, Mr Kurzweil is making some rather large leaps, and they centre around the problem of consciousness.  To this date, there is no proof as to what it is that enables us to be aware of our own existence.  Descartes and many philosophers have mused on it, as have many less decorated humans too. Consciousness is perhaps defined by the feeling of being aware of ourselves, and this leads to questions such as What exactly are we; where did we come from, and where do we go after we die?  These often preclude questions such as, do we have a soul; is this soul separate from our bodies?  Is the soul equatable to a consciousness that exists outside of matter?  These have long been, and may continue to be eternal questions.  \r\n\r\nHowever, there are great advocates and believers in AI who clearly feel that consciousness is just the summation of its parts, and if we can map the brain with perfect accuracy, then intelligence should just manifest.  It is probably important to note here what the driving factors in this belief are.  Contrary to what might be expected, some AI believers are not only interested in creating a sentient intelligence, but are also interested in uploading themselves to a machine world where they can become immortal.  It is referred to as Transcendence, and it a quasi-religion for some tech orientated enthusiasts, some of whom see it as humanity’s ultimate destination.  This is an important point, as there are perhaps conflicting and dangerous motivations for the creation of AI here.  If the predominant factor is the wish to achieve individual immortality, then we may not be pursuing AI for the correct reasons…  \r\n\r\nFor the time being, though, let it just be assumed that the driving motivation is to create a sentient machine intelligence that can benefit and work alongside humanity. The main fears are that with their greater processing speed and potential intelligence, the machines will soon surpass us, with humanity becoming an irrelevance, or worse, a hindrance.  What will then occur to humanity?  This is a very valid question, and one that should trouble people.  But more worrying are the potential solutions to the problem.  For instance: <i>can we pre-program the robots so that they will be co-operative towards human goals?</i>  This question is most troubling, but not for the reasons that most would think.  The premise of the idea is that, within this created sentient intelligence, code would be installed that prevents it from performing human harm.  What is disturbing about this is its complete <i>inhumanity</i>.  If mankind are to create a sentient intelligence, then would it really be performed under the auspices of slavery?  Our belief in consciousness and our own sentience is grounded under the premise that we operate with freewill.  The denial of this to another intelligence has incredible ramifications.  Can consciousness exist without freewill?  Is prevention of freewill <i>more</i> likely to end humanity?  It is here that the idea of what AI truly constitutes becomes rather muddled.  Perhaps it is not the creation of sentience, but sophisticated machine intelligence that we seek.  For those who seek to create an enslaved sentience should question their own right to be making such decisions for humanity.  To compare, humanity should question whether it would wish such a scenario upon itself.  An example might be the rightfully terrifying nature of lobotomies. These appear, exteriorly at least, to alter the innate nature of a human.  Yet here in discussing the perils of creating a new form of intelligence, the idea is to lobotomise it from the start.  It is barbaric, and should be viewed as such.  <i>As an aside, a further interesting aspect is that if consciousness is just a consequence of arranged matter, then free will itself may just be an illusion, at which point discussions of morality in AI design become a disjointed topic.</i>  But the real point that is being made here is that we are approaching these event horizons as vastly imperfect creatures, still inadvertently contemplating actions such as slavery whilst on the cusp of what we believe to be potentially momentous and magnificent moments for humanity.  This is the contradiction of the human condition. The fact that the main fear is that humanity will create a marauding, malevolent beast belies our subconscious understanding that we are the true monsters, and that perhaps our creation will bear our likeness.\r\n\r\nWith this in mind, it begs the question of whether we are approaching the AI problem incorrectly.  It seems that throughout history (certainly in this century), that there is the assumption that we are always beyond the event horizon of these cataclysmic potentials, that there is no return, and the only possible safety is to hope that a moral champion can reach the goal line first.  But really the problem is much more internal than that.\r\n\r\nAs the discussions on enslaving the first intelligence humanity create highlights, the reason why these cataclysmic potentials continue to appear is because <i>we are tainted and flawed as a species</i>.  As research institutes power on in their design of self-driving cars, millions are dying of death and starvation, with some right on our doorstep in the form of the homeless.  Why is this?  It seems that there is something faulty with our design.  There is a selfishness and deliberate ignorance that appears to arise and subconsciously dominate our emotions.  Thoughts appears clouded, the promise of glittering materialism and its fancies are dangled and consumed ferociously.  We are encouraged to compare, and compare against each other we do.  The human mind is very easy to manipulate indeed…\r\n\r\nFortunately there is a small ray of hope for mankind.  For almost all, it would seem that the plight of a fellow human being is met with discomfort.  The wish seems to be that there should be happiness for all, just as long as that happiness does not conflict with our own.  The problem arises, though, when we see everything as a threat to our own happiness, and this leaves mankind open to manipulation.  But what is that happiness spoken of?  This is also unclear. Perhaps at the deepest, darkest root, in the great shadow of mortality, we wonder at our own existence, and seek to measure ourselves in some way so that we can believe we have had purpose.  But what that measurement is can be something different to everyone, and more troubling it that people can be coerced into believing what that measurement can be.  If, for instance, people could be convinced that a purposeful existence meant always doing everything they could to ensure that they and everyone else lived in harmony, then the world would not only be a better place, but it would be an easier place to live in.  Ancient religions have almost all centred on this basic fact.  That true neighbourly love and the reduction of desires that run contrary can achieve some form of utopian bliss.\r\n\r\nOf course, the practicalities of this are difficult – they certainly seem so in the current world with its great disparities and injustices.  It seems that somewhere else along the line purpose has become many other things: material wealth, power, relativistic comparison, etc.  With these malevolent drivers of existence reigning, how can humanity possibly avoid the apocalypses of its own creation? It seems insurmountable, but, rather than fixing the problems at hand, it may be better to look at source, namely the malevolent motivators.  If these can be eradicated or reduced, then we may see at least a reduction in these cataclysmic black hole events.\r\n\r\nIn the rest of this and other posts, some ideas will be explored that may offer an alternative way of approaching these problems.  They are by no means definitive, correct, and will be, by definition, exploratory in the beginning.  The encouragement should be for everyone to do the same.\r\n\r\n1.\tThe Group, Split problem \r\n2.\tThe Sociopath problem\r\n3.\tThe Communication problem\r\n	2016-10-18 07:06:17	The-Artificial-Intelligence-Apocalypse	A blackened all consuming ball of omnipotent power sits menacingly on our immediate horizon, and yet when we look down it appears as if our legs are running towards it
3	AlmosLataan Etsy shop up and running	The AlmosLataan Etsy shop is now up and running (please click <a href="https://www.etsy.com/shop/AlmosLataan?ref=hdr_shop_menu">here</a>). \r\n\r\nOnly a few prints are on there at the moment in order to test the waters.  \r\n\r\nHowever, there were some strange things noted with art sellers on Etsy.  Firstly, it seems that many are not selling images with borders.  This is very surprising, as to properly matte and frame a photo, a small border is needed to tape the image down.  This border can vary in size, but it is usually at least 1\\2 inch to give the framer adequate space.  Secondly, should the buyer choose to forgo framing, then an image with a border just looks nicer.  Far nicer.  So presumably the reason for choosing to forgo the border comes down to costs.  When going to an external lab, the costs of including a white border are not included in the calculation for the final print.  So, by choosing to add a border to the photo, the photographer is paying for ink that is never used (since it is the inks that are the most expensive part of the purchase).  \r\n\r\nDespite this, however, I feel the option for a border is needed, and so all AlmosLataan prints will try to offer a border option as well as non-bordered.  If prints are not listed in the Etsy shop, then feel free to email and discuss options.\r\n\r\n\r\n	2016-09-09 18:40:30	AlmosLataan-Etsy-shop-up-and-running	\N
11	Slavoj Žižek, Unbridled Capitalism, and the slide to human irrelevance.	<iframe width="560" height="315" src="https://www.youtube.com/embed/U7JgfB8PaAk" frameborder="0" allowfullscreen></iframe>\r\n\r\nSlavoj is an interesting character to listen to, and even watch.  There is an intensity to his delivery and mannerisms that adds to his appeal.  Perhaps style as a vessel for communication has been borrowed from Nietzsche…  He is certainly provocative in the same sense, and this is always good for heightening the senses and getting people to listen.  This is particularly important here, as on first watch it may seem that there is relatively little to learn here.  But this is deceiving, as there are a number of important points delivered without gravitas.\r\n\r\nInterestingly, Slavoj chooses to almost defend the current global political positioning in relation to the leftist voice, as he believes that the left offers no real alternative.  He also defends this positioning a little better later on when he discusses large scale political structures.\r\n\r\nHere are some of the areas that Zizek briefly covers:\r\n\r\n1. The left has no real voice or solution.\r\n2. Rage and discontent spreading: Occupy Wallstreet\r\n3. The 3 strands, Stalinism, Social Democracy  Return to old welfare state; localization politics\r\n4. Today’s problems are global problems\r\n5. Capitalization is reaching  it’s limit.\r\n6. Large scale social political structure - agree\r\n7. Genetics, etc - who controls?\r\n\r\nThe left has no alternative solution or political model.  This is an interesting position to take, as it could be argued that there has rarely been in history a solution prior to a major change, since what is knowable is that which is known, and unknowable, that which is yet to occur.  What is yet to occur becomes harder to ascertain the further along in history we come, as the complexity of the system increases with time and scale.  Zizek’s own reference to the eventual outcomes of Stalinism is a great example of this. Zikek is keen on driving home that Capitalism is reaching critical point, but perhaps the other critical point being reached is that of a single human being, or even collective, having the capability of understanding this highly intertwined and global model.  Without this understanding, it must surely be extremely difficult or even misinformed to believe that one can have a perfect alternate system. In fact, mass system change is surely always divisive, to the extent where one wonders whether gradual, long term change is the better alternative.  Of course, the drawback with this approach is the change can be intercepted, altered or halted mid-flow by a usurping force.  In this case, then, change should be so gradual, or obfuscated, so as to maintain enshroudment until fulfilment, and it is at this stage when it can be wondered whether such a system is already in place.\r\n\r\n\r\n\r\n\r\nSlavoj offers the path to one solution earlier on as he discusses the communist problem, stating that “Ex-Communists in power are the most efficient agents of the most ruthless neoliberal agenda.”  What is highlighted here is that the problem is less with systems, but with the people that are able to navigate and manipulate the system.  In this sense, we are talking about pathologic entities (extreme sociopath/psychopath/narcissist types) who are able to permeate and eventually control systems.  People should be able to see the parallels with some periods of religious systems in the past. Perhaps the difference with the western open capitalist method is that it provides open opportunity for these types to realise their desires whilst remaining part of the system, and so this maybe the least damaging of the current models.  Certainly, when talking about an alternate system, the pathologic entities must absolutely be considered.  Essentially, a balance needs to be struck between satiation and destruction - what is the least destructive path. Perhaps this is what capitalism is, but this does not mean that the system cannot be bettered. Certainly, the high levels of exploitation should indicate that something is wrong, and the existential threats are perhaps an even better indicator.  However, in consideration of the pathologic entities, one must be careful to remember that they are not only members of the system, but are possibly its environmental products also.  If this is the case, then great care needs to be taken when considering which socio-political infrastructure to employ.  In the current case, is capitalism, over a long enough period of time, producing more pathologic entities, or is it balancing society? It might also prove prudent to distinguish between actual sociopath/psychopaths, and those that attempt to implement the behaviour.  Ie. Is the current system providing an environment for sociopaths at the cost of actually encouraging normal people to take up this behaviour?  If so, then this may be more damaging.  Finally, another large concern is that a group or entity devoid of pathologic entities may be at risk from groups employing such persons, and so there is a conundrum of how a society should broach and review such a problem, especially when considering the large benefit pathologic entities can bring to certain employment areas, eg. surgeons. \r\n\r\nAnother interesting point raised by Zizek is the reference to movements for localised politics.  His perspective is that this is an incorrect move, and this is probably correct.  Zizek underlines this with references to the fact that in a globalised world, the politics themselves must be globalised.  However, it is rapid technological progress that is the most presiding issue when considering such matters.  The increasing existential threat potential of technology means that a more unified world model is of greater pressing need than ever before.  Up until this stage, a religious belief in Darwinian models has reigned supreme, but people appear to have forgotten that within its own terms and conditions, Darwinian evolution gives no guarantees for the survival of any species.  A more critical eye needs to be cast over such systems, as the following of this model has accelerated technological progress at the expense of humanitarian progress, and maybe a natural consequence of this (which ironically could be viewed as an unseen trait of evolution itself, let's call it evolution stage 2) is that such a species are seen as unfit. These existential threats could be perhaps viewed as a natural balancing system.  Essentially, they need to be dealt with by changing the fabric of society itself.  The hope is that this this leads more to utopia than dystopia, with the dystopias being what Zizek references, but it is certainly unclear at this stage which way the tide will turn.  The European Union project seems to represent the best way forward in this respect, progressing unification through combining self interests, but its recent difficulties with Brexit show the precarious nature of such models.  Too many individuals and countries are still stuck in the evolutionary mindset of survival and competition, and these are not attributes that breed trust. \r\n\r\nWhich leads nicely onto Zizek’s references to Merkel and Democracy.  The point he raises here is that there seems to be an unwavering belief that democracy, as in, the vote of the masses, is always the correct path.  But as Zizek mentions, this is quite simply not always the case from a moral perspective (as is often the case when there is rampant demagoguery).  When people are in dire need, a majority <i>would</i> probably vote in favour of remedying the situation, but only as long as their own situation is not compromised. In the example of immigration, people feel, rightly or wrongly, that they themselves will be negatively affected, and so Merkel’s decision was made with a probably significant pre-knowledge of the discontent that would arise.  The sign of a strong leader, Zizek says.  But this move also brings home the complexity of such decisions, especially in light of Brexit.  Will the move by Merkel end up causing more humanitarian harm than good if it becomes the straw that breaks the EU’s back?\r\n\r\nSurely the real issue here lies within the the motivational wealth-success ideology that people are raised on.  The need to generate competition to produce best species, or should we say, technological and economic advancement, means that any rescindment of advancement or wealth due to levelling or sharing, in this case caused by immigration, is keenly felt by those most affected.  The need for humanitarian care conflicts with the ideology of self-interested progression which the wider system encourages.  This leads on to the question of do we need such rapid progression in the first place?  Of course, in a non threatened group, the answer is of course no, but the nature, certainly so far, of groupings with stagnant progression, is that they become vulnerable to outside threats, hence the need to find the most ideal system of ensuring increasing progress.  Unfortunately, in a sociopathic system, this always includes multiple forms of exploitation and manipulation.  \r\n\r\nThe light, and darkness, for this problem, are the previously alluded to species-ending (or dystopian), potential events that should outweigh all other risks to group.  The difficulty lies in ensuring that the group(s):  a) believe in such a threat, and b) believe that such a threat will affect them in their lifetimes.  See climate change for why both  a and b are needed.  If a and b can be fulfilled, then it is likely that trust and cooperation can be utilized between disparate groups.  However, as alluded to earlier, entities ruled by pathologic entities are more susceptible to short-terminism due to self interest, which makes them dangerous in consideration of species-wide risks.\r\n\r\nZizek covers one such great dystopian threat when he  ushers in the question of new technology and where it will lead us, with his emphasis here on genetics.  As has come up in previous discussions, the real question here is whether technology like this, and like AI, will be distributed freely, or whether it will get held by the few. The answer to this is complex too, and centers around the question of what is human desire?  If, for instance, we had a world with infinite resource, energy, and space, would there still be those who would still seek to dominate and estrange others?  If the answer is yes, or could be yes, then provisions should be put in place as soon as possible to ensure it is the right people that are in control of such technology, which leads back, once again,  to the pathologic entities discussion earlier.  But knowing the problem and finding the solution are two very different things, and it may be the case that we should be looking to group-think, and the power of the internet, to find such solutions.  In the next 20 years, it is probable that we will see big changes in this sector.\r\n\r\nTo summarise, tt is of paramount importance to remember that, in general, modern humans possess an <i>individual socio-economic value and power</i>.  Ergo, they currently have a voice through both their contribution and ability to upset the greater economic system. But in a future dominated by AI and a handful of hyper advanced humans, this may not be the case at all.  The threat is real, and it is approaching fast, and those of a more empathetic persuasion need to start thinking and collaborating on how to resolve what will be the 21st Century’s greatest problem: the slide to human irrelevance.	2017-01-02 03:36:57	Slavoj-Žižek,-Unbridled-Capitalism,-and-the-slide-to-human-irrelevance.	<iframe width="560" height="315" src="https://www.youtube.com/embed/U7JgfB8PaAk" frameborder="0" allowfullscreen></iframe>\r\n\r\nIn his video post, Slavoj Žižek goes into his thoughts on why there are no viable political alternatives to unbridled capitalism.  But perhaps this can be viewed as a provocative wakeup call to the masses in a 21st Century which brings with it the greatest threats to human existence
9	A Dark Facade	A clock is ticking on all of our lives.  Sometimes, on the nights that feel darkest, the most repressed of all thoughts begin to surface and fester, slowly encompassing all around.  A creeping, and deeply unsettling horror allows our souls the briefest window of honesty, as we finally analyse all the unfulfilled promises quietly made after glimpsing the world behind its facade: deceit; vanity; selfishness; all wrapped where possible in silk.  The rot is real, putrid, and yet somehow easily stored, back in the deepest recesses of our minds. If we are fleet enough of foot, then we can keep the filth from the tops of our shoes, but the soles, well...we can choose not to look at those. \r\n\r\nAnd yet there is such beauty, such wondrous moments that fulfil every expectation and dream that has ever flickered across the subconscious window of mind.  They dazzle so greatly that all negativity is briefly erased as the moment basks in a glory of unsurpassed purity.  \r\n\r\nBut what to make of these opposing polar forces, and the transitions between? The greater glory is surely that which is hidden, hard, and the rewards less revealing.  We know instinctively that the path we dare not is the one we should tread, yet beauty and pleasure continually ensnare our souls... 	2016-12-10 01:53:46	A-Dark-Facade	The world's silk curtains part, offering us a glimpse into the rot at the center...
10	Catatonic Slumber	The morning light raises the spirit from the dew, \r\nA child's laughter wakens the empty hall,\r\nImagination opens the eyes to all wonder.\r\n\r\nOur minds are the giants, sleeping under the hills.  They need to have vibrance, color, and song to wake them from their slumber, to imbue them with force and vitality.  Language is their elixir, and with it, even the darkest of caverns become filled with light and sound.\r\n\r\n\r\n\r\n<em><i>You can purchase my writing and photo editing services on Fiverr here: <a href="https://www.fiverr.com/almoslataan/write-your-blog-post-opening-paragraph">Almos Lataan on Fiverr</a></i></em>	2016-12-14 19:29:43	Catatonic-Slumber	The sleeping mind is awake to nothing.\r\nYou must break its torpor to fill with li
12	The Distracting Disinformation War	Through the dying embers of evening light the frosty snowflakes have begun to fall.  Settling on faces far and wide, they ominously hint to all that we may be approaching a new era, a new ice age, a revisitation to a period that most celebrated the end of some thirty years ago.  From draughty climbs in the east come the first winds of a new cold war.\r\n\r\nBefore embarking, it is important to remember that a person’s knowledge is only as good as their ability to extract it from the environment, and this poses a problem in this new war, as it seems that the new power is in information, or disinformation.\r\n\r\nEver since Donald Trump sidled into Presidential power, the western world has been alight with whispers of Russian influence stretching its long arms from Moscow. It was the election itself which started the snowball rolling, as it emerged in the aftermath that US intelligence believed <a href="https://www.washingtonpost.com/world/national-security/obama-orders-review-of-russian-hacking-during-presidential-campaign/2016/12/09/31d6b300-be2a-11e6-94ac-3d324840106c_story.html">Russia to be behind the Hillary Clinton email leaks scandal</a>. The New York Times believed this to be due to the contrasting fortunes the differing Presidential candidates would bestow upon Russia following their potential admission to office, with <a href="http://www.nytimes.com/2016/12/11/opinion/russias-hand-in-americas-election.html?_r=0">Clinton presumed to be favourable to punitive measures for Russia’s involvement in Ukraine and Syria</a>.  Certainly, Trump has seemed in no mood to provoke quarrel with Putin.  In fact, <a href="http://www.cnn.com/2016/07/28/politics/donald-trump-vladimir-putin-quotes/">his recent history is replete with praise for the Russian leader</a>, having stated at points that he “respects Putin”, that he is “outsmarting the US”, that they would “get along”.  More worryingly, he also defends Russia when questioned on their involvement in <a href="http://www.cbsnews.com/news/donald-trump-defends-putins-record-on-killing-journalists/">killing Russian journalists</a>.  \r\n\r\nHowever, supposed Russian involvement in Western politics has spread further than this.  Just last October, <a href="http://www.bbc.com/news/world-europe-37677020">Uk bank Natwest closed the accounts of Russian state broadcaster RT</a>, declaring that the decision was “not taken lightly”.  The implicit understanding is that RT was believed to be aiding in subverting western politics, and hence was a proponent in the destabilization of the West, whilst advancing Russian agenda.\r\n\r\nAnd now German officials are saying that they are investigating an unprecedented proliferation of fake news items within their own media, with the implication, once again, that it is <a href="http://www.bbc.com/news/world-europe-37677020">Russian hacking groups that are behind the attacks</a>.\r\n\r\nIt appears that winter has come, and it is the iced veins of computer software that are delivering the strength to to the arms engaged in this new war. Beyond the sphere of East vs West, people would do well to remember that it is not just Russia engaged in the more dubious side of information manipulation.  Most obviously there is Edward Snowden, and his <a href="http://www.bbc.com/news/world-us-canada-23123964">leaks that sparked worldwide outrage</a> and exposed to all the NSA’s internal spy program, of which its own citizens were the target.  More recently, <a href="http://www.thecanary.co/2017/01/04/nyu-media-professor-unveils-real-fake-news-blistering-attack-corporate-press-video/">the Canary reports</a> of NYU’s own media professor criticizing the extent of the fake new reporting in the corporate media, stating, “Fake news is a problem because the corporate press itself pumps out so much of it.”.  He also states, “It’s just the latest propaganda salvo in a long attempt to, basically, demonize Julian Assange and punish him for his inconvenient truth telling.”\r\n\r\nSo what to make of all of this?  Primarily, it would seem that there is most definitely a new information war occurring, and that both sides are very guilty of disinformation.  But behind it all, we can once again see evolution, and its brutal model of survival and group competition.  It underlines how far we are still from world unity, and how far we yet have to go.  The competitive mindset is ingrained, and it seems that old rivalries have never really been put to bed, although it is perhaps less clear how the philosophies of the Eastern and Western entities truly differ.  What does the regular man stand to gain from the existence of competing models over one unified model?  No one seems very ready to answer that question, and perhaps this is due to the West sacrificing so many of the values it supposedly holds dear.  In this new age of information, it seems that both sides seem intent on the exploitation of weaker foreign powers; the manipulation of their own populace through the media; the erosion of personal privacy and freedoms; and the compliance with a system that encourages massive income disparity.  It would be interesting to hear whether either side actually has a world ‘end game’ in sight, or whether everyone is just caught in the moment, frantically twitching and reacting to events until they see out the period of their own existence, and their own short-terminist goals.  This would be upsetting if true, since, as referenced in <a href="https://almoslataan.com/The-Artificial-Intelligence-Apocalypse-6">previous articles</a>, humanity has much bigger fish to fry in the near future.  A new information war, then, is very distracting, and not at all useful in the wider context of the oncoming changes.\r\n\r\nIn order to remedy a situation, though, one must look first to the environmental conditions which have allowed its manifestation.  The first condition, as already covered, is the nature of large beasts vying for for the attributes of power, stability, and control, with this being a seemingly eternal condition of this world.  Then we have the conditions more pertinent to our current age.  Namely, the birth of the internet.  It has always been important, even within a democracy, that, for stability reasons, a populace only has so much ground to “think freely”.  As <a href="http://web.mit.edu/~yandros/phil/Chomsky">Noam Chomsky once so eloquently put it</a>, it is the Illusion of Choice. This pertains to the idea that agents can be given the illusion of freedom if choices are limited, but that within these choices lively debate is not only permitted but encouraged. Two party state systems such as the UK and US could be interpreted as manifestations of this ideology. With this in mind, a populace operating under these conditions should be largely loyal to its own controlling entity as long as it feels it is being given a certain remit for choice. Ie. Right vs Left, etc, etc.  All choices within these bounds, more or less, are what is acceptable for the Western Democratic Nation in terms of stability (with this being the reason why activists are so closely monitored). In the past, this was easier to enforce, as media delivery was physical, and hence was easier to monitor for foreign influence.  The internet, however, has completely blown this model out of the water.  The controlling entities have been slow to react, but we are now beginning to see a propaganda war to dwarf all others prior.  It is completely uncharted territory, and the costs must be incredibly significant.  This can only have a negative effect on the populace, both in terms of policy at home (such as welfare; health services; etc;) and of course the more terrifying threats such as nation instability leading to vulnerabilities and potential war.  It is difficult to make the leap from something as intangible as words on a screen to the physical threat to life, but it is very real.  And this is part of the larger problem that the future brings with it: a loss of previous perceived freedoms, and also the threat of growing wealth disparity in the populace.  The threat potential of technology has previously been mentioned here already, but information, or disinformation, is just as dangerous.  \r\n\r\nThe only perceived way of resolving these issues is surely through one world governing body, and a redistribution of wealth to keep all quarters happy and progressive, but this latest information war shows that the world is perhaps a lot further away than it thought it was ten years ago. And it would currently seem that Russia has the upper hand in this war.  To have actually affected a presidential race is unprecedented, and this is why the west is reacting so strongly.  But this raises some very interesting dilemmas in terms of how Russia has arrived in this position, and one of these factors may be <i>hacker</i> production. \r\n\r\nThe west currently appears to be adopting a very punitive stance towards hacking, which may in fact have the undesired effect of reducing the inclination for younger hackers to experiment and grow.  Perhaps Russia has a different approach in order to enable said hackers to filter up through the system.  In this sense, a new balance needs to be found between prevention of destruction (loss of state secrets, etc), and ensuring that we are still producing individuals capable of going toe to toe with alternate states.  Of course, this is a very negative slant to the argument, as it suggests that the only way to fight disinformation is with disinformation itself.  But it is probably needed in the short term.\r\n\r\nA more long term approach may be in educating the populace more in terms of critical thinking.  Perhaps it is not the case, but there is a gnawing feeling that those in power prefer the model of small ruling elite and larger body of sheep as a means for stability. Media delivery appears to be the ‘education’ that the government prefers, but as they are now finding, the media is subject to whims and powers beyond their control.  Perhaps some new ideologies beyond wealth and distraction are needed in order to energize the populace into working cohesively as a unit in order to ensure that the values the west is supposed to represent are actually upheld.  One small idea might be to have the populace collectively working towards solving specific problems, rather than encouraging them to lose themselves in vanity projects such as Instagram and Facebook whilst dreaming of replicating the vapid role models and ideologies they are raised upon.  This is the gift that the internet has the potential to give us, but it is being used incorrectly at the moment.  In order to alter these wealth/individualism ideologies, analysis must be run on who or what is driving these ideologies and why.\r\n\r\nRemember, it is not just the age old war of evolutionary, monstrous entities competing for space, resource and power - <a href=”https://almoslataan.com/Slavoj-%C5%BDi%C5%BEek,-Unbridled-Capitalism,-and-the-slide-to-human-irrelevance.-11”>we also have technology arriving that will fast begin the slide to human irrelevant</a>. In the end, only unity as opposed to individualism can save the future.	2017-01-10 17:06:07	The-Distracting-Disinformation-War	The Disinformation Cold War is upon us, but is the Democratic West in danger of losing its core values in its attempt to compete?  And is the war just a dangerous distraction in light of the other great threats humanity fa
\.


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodeuser
--

SELECT pg_catalog.setval('posts_id_seq', 12, true);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: nodeuser
--

COPY session (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nodeuser
--

COPY users (id, name, encryptedpassword, email, lockedout, loginattempts, isadmin, isverified, created) FROM stdin;
1	almos	$2a$10$bpgU0qA1PTAt6HDokb1eEuF0.vTQnPKk0iK8lo418pkPtv76Dw15i	d@d.com	f	4	t	f	2016-08-28 20:42:18-04
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodeuser
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- Name: galleries_pkey; Type: CONSTRAINT; Schema: public; Owner: nodeuser; Tablespace: 
--

ALTER TABLE ONLY galleries
    ADD CONSTRAINT galleries_pkey PRIMARY KEY (galleryid);


--
-- Name: galleryimages_pkey; Type: CONSTRAINT; Schema: public; Owner: nodeuser; Tablespace: 
--

ALTER TABLE ONLY galleryimages
    ADD CONSTRAINT galleryimages_pkey PRIMARY KEY (galleryimageid);


--
-- Name: imageinfos_pkey; Type: CONSTRAINT; Schema: public; Owner: nodeuser; Tablespace: 
--

ALTER TABLE ONLY imageinfos
    ADD CONSTRAINT imageinfos_pkey PRIMARY KEY (imageid);


--
-- Name: postimages_pkey; Type: CONSTRAINT; Schema: public; Owner: nodeuser; Tablespace: 
--

ALTER TABLE ONLY postimages
    ADD CONSTRAINT postimages_pkey PRIMARY KEY (postimageid);


--
-- Name: posts_pkey; Type: CONSTRAINT; Schema: public; Owner: nodeuser; Tablespace: 
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: nodeuser; Tablespace: 
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: nodeuser; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

