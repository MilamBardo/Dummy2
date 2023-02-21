

import * as pg from 'pg';
import * as pgPromise from 'pg-promise';
import * as Users from '../models/Users/User';
import dbProvider = require('../../db')

    export class userRepository
    {
        
        db = dbProvider.dbpool;

        constructor() {
            }
        

        // Creates the table;
        //create = () =>this.db.none(sql.create);

        // Drops the table;
        //drop = () => this.db.none(sql.drop);

        // Removes all records from the table;
        //empty = () => this.db.none(sql.empty);

        // Adds a new record and returns the new id;
        // It is also an example of mapping HTTP requests directly into query parameters;
        
        // addnew = (values:any) =>
        //  this.db.one(sql.add, values)
        //  .then((user:any) => user.id);

        

        async add (user : Users.Users.User)
        {
                //var name = user.name;
                //var en
                const res = await this.db.one("INSERT INTO Users(name, encryptedpassword, email, lockedout, loginattempts, created) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
                    [user.name, user.encryptedpassword, user.email, user.lockedout, user.loginattempts, user.createddate]);

                return res.id
        };
        
        async verify (user : Users.Users.User)
        {
                const res =  await this.db.one("Update Users SET IsVerified = $1 WHERE name=$2 and email=$3 VALUES($1, $2, $3) RETURNING id",
                    [true, user.name, user.email]);
                return res.id
        };
        
        async findany (username: string) 
        {
            const res = await  this.db.oneOrNone('select * from users WHERE name =$1', username)

            return res
            // .then( function (data : any) {
            //     // success;
            //     return this.mapuser(data);
            // })
            // .catch ( function (error : Error) {
            //     console.log("ERROR:", error.message || error); // print error;
            //     throw error
            // });
            
        };

        async findbyusername (username: string) 
        {
            const res =  await this.db.oneOrNone('select * from users WHERE name =$1', username)

            return res
            // .then( (data : any) =>{
            //     // succesBs;
            //     return this.mapuser(data);
            // });
        };

        async update (user: Users.Users.User)
        {
            const res = await this.db.result('Update Users SET loginattempts = $1, lockedout = $2 WHERE id = $3', [user.loginattempts, user.lockedout, user.id]);

            return res
        };

        mapuser(userdata: any)
        {
            if (userdata == null)
            {
                return null;
            }
            let uid : number = userdata.id;
            let username : string = userdata.name
            let epassword : string = userdata.encryptedpassword
            let email : string= userdata.email
            let lockedout : boolean = userdata.lockedout;
            let attempts : number = userdata.loginattempts
            let isadmin : boolean = userdata.isadmin;
            let verified : boolean = userdata.isverified;
            let created : Date = userdata.created;

            return new Users.Users.User( username , epassword , email , uid , lockedout , attempts , isadmin , verified, created );
        };
        //findbyusername (username: string) 
        // {
        //     let callback = ((err: Error, client: pg.Client)=>
        //     { 
        //         client.query('SELECT * FROM Users WHERE name = $1', [username], function(err, result) {
        //                     // you MUST return your client back to the pool when you're done!
        //                     //console.log(result.rows[0].name); // output: foo
        //                     let newid =  result.rows[0].id;
        //                     let name =  result.rows[0].name;
                            
        //                     });
        //     });
        //     pg.connect(this.connectionString, callback);
        // }
        
        // remove = (id:number) => this.db.result('DELETE FROM Products WHERE id = $1', id)
        //     .then((result:any) => result.rowCount);

        // find = (id:number) => this.db.oneOrNone('SELECT * FROM Products WHERE id = $1', id);

        // all = () => this.db.any('SELECT * FROM Products');

        
        // total = () => this.db.one('SELECT count(*) FROM Products')
        //     .then((data:any) => parseInt(data.count));
    }
