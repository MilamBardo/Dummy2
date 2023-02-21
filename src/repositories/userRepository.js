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
exports.userRepository = void 0;
const Users = require("../models/Users/User");
const dbProvider = require("../../db");
class userRepository {
    constructor() {
        this.db = dbProvider.dbpool;
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
    add(user) {
        return __awaiter(this, void 0, void 0, function* () {
            //var name = user.name;
            //var en
            const res = yield this.db.one("INSERT INTO Users(name, encryptedpassword, email, lockedout, loginattempts, created) VALUES($1, $2, $3, $4, $5, $6) RETURNING id", [user.name, user.encryptedpassword, user.email, user.lockedout, user.loginattempts, user.createddate]);
            return res.id;
        });
    }
    ;
    verify(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.one("Update Users SET IsVerified = $1 WHERE name=$2 and email=$3 VALUES($1, $2, $3) RETURNING id", [true, user.name, user.email]);
            return res.id;
        });
    }
    ;
    findany(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.oneOrNone('select * from users WHERE name =$1', username);
            return res;
            // .then( function (data : any) {
            //     // success;
            //     return this.mapuser(data);
            // })
            // .catch ( function (error : Error) {
            //     console.log("ERROR:", error.message || error); // print error;
            //     throw error
            // });
        });
    }
    ;
    findbyusername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.oneOrNone('select * from users WHERE name =$1', username);
            return res;
            // .then( (data : any) =>{
            //     // succesBs;
            //     return this.mapuser(data);
            // });
        });
    }
    ;
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.result('Update Users SET loginattempts = $1, lockedout = $2 WHERE id = $3', [user.loginattempts, user.lockedout, user.id]);
            return res;
        });
    }
    ;
    mapuser(userdata) {
        if (userdata == null) {
            return null;
        }
        let uid = userdata.id;
        let username = userdata.name;
        let epassword = userdata.encryptedpassword;
        let email = userdata.email;
        let lockedout = userdata.lockedout;
        let attempts = userdata.loginattempts;
        let isadmin = userdata.isadmin;
        let verified = userdata.isverified;
        let created = userdata.created;
        return new Users.Users.User(username, epassword, email, uid, lockedout, attempts, isadmin, verified, created);
    }
    ;
}
exports.userRepository = userRepository;
//# sourceMappingURL=userRepository.js.map