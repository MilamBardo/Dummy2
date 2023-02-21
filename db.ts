// /// <reference path='./typings/index.d.ts'/>
// /// <reference path='./node_modules/pg-promise/typescript/pg-promise.d.ts'/>
// /// <reference path='./node_modules/pg-promise/typescript/ext-promise.d.ts'/>

import * as pgPromise from 'pg-promise';
var options = {
    // Initialization Options
 }

let pgp = pgPromise(options);
//LIVE let connectionString : string = process.env.DATABASE_URL || 'postgres://nodeuser:Talanath5@127.0.0.1:5432/Almos';
let connectionString : string = process.env.DATABASE_URL || 'postgres://Almos:Talanath5@localhost:5432/Almos';
let dbpool = pgp(connectionString);

export = { dbpool}

//import * as pg from 'pg';

// class dbpool
// {

//     connectionString : string = process.env.DATABASE_URL || 'postgres://Almos:Talanath5@localhost:5432/Almos';
//     public clientpool : any;

//     constructor()
//     {
//         var config = {
//             user: 'Almos', //env var: PGUSER
//             database: 'Almos', //env var: PGDATABASE
//             password: 'Talanath5', //env var: PGPASSWORD
//             port: 5432 //env var: PGPORT
//             };
//             this.clientpool =  pg.pools.getOrCreate(config);
//     }
// }
//  import * as promise from 'bluebird';
//  import * as pgPromise from 'pg-promise';

// import users = require('./src/repositories/userRepository.ts');


// interface IExtensions {
//     users:users.userRepository;
// }

// var options = {

//     promiseLib: Promise,

//     extend: (obj:any) => {
//         obj.users = new users.userRepository(obj);
//     }

// };


// var config = {
//     host: 'localhost',
//     port: 5432,
//     database: 'pg-promise-demo',
//     user: 'postgres'
// };



// var pgp = pgPromise(options);


// var db = <pgPromise.IDatabase<IExtensions>&IExtensions>pgp(config);


// export = {

//     pgp,

//     db
// };

//import * as pgPromise from 'pg-promise';
// export class dbpool
// {
//      db : pgPromise.IDatabase;

// constructor()
//      {
         
//         var connectionString : string = process.env.DATABASE_URL || 'postgres://Almos:Talanath5@localhost:5432/Almos';

//         this.db = <pgPromise.IDatabase<Ext>>pgPromise(connectionString);
//      }
// }