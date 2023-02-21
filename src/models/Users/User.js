"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var Users;
(function (Users) {
    class User {
        constructor(username, hashedPassword, email, id, locked, attempts, admin, verified, created) {
            this.id = id;
            this.name = username;
            this.encryptedpassword = hashedPassword;
            this.email = email;
            this.createddate = new Date();
            this.lockedout = locked == null ? false : locked;
            this.loginattempts = attempts == null ? 0 : attempts;
            this.accountverified = verified == null ? false : verified;
            this.isadmin = admin == null ? false : admin;
            this.createddate = created == null ? new Date() : created;
        }
        incrementloginattempts() {
            this.loginattempts++;
            if (this.loginattempts > 5) {
                this.lockedout = true;
            }
        }
    }
    Users.User = User;
})(Users = exports.Users || (exports.Users = {}));
//# sourceMappingURL=User.js.map