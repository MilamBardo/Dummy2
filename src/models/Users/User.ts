 export module Users
 {
    export class User {
        
        id : number;
        name : string;
        encryptedpassword : string;
        email : string;
        accountverified : boolean;
        loginattempts : number;
        lockedout : boolean;
        isadmin : boolean;
        createddate : Date; 

//TO DO  
//Add separate login attempt object so that we can monitor the IP addresses used.  SHould perhaps
// only create once a user is locked out.  At that point they are added to a monitoring list.
//Or maybe we could log each and every request to a login table, and view ips against time from
//there?

        //First is the create contructor
        constructor( username : string, hashedPassword : string, email: string);
        //Second is mapping constructor
        constructor( username : string, hashedPassword : string, email: string, id? :number, locked?: boolean, 
         attempts? : number, admin?: boolean, verified? : boolean, created?: Date);
         
        constructor( username : string, hashedPassword : string, email: string, id? :number, locked?: boolean, 
         attempts? : number, admin?: boolean, verified? : boolean, created?: Date) {
            this.id = id;
            this.name = username;
            this.encryptedpassword = hashedPassword;
            this.email = email;
            this.createddate = new Date();

            this.lockedout = locked == null ? false : locked;
            this.loginattempts = attempts == null ? 0 : attempts;
            this.accountverified = verified==null ? false : verified;
            this.isadmin = admin==null ? false : admin;
            this.createddate = created==null ? new Date() : created; 
        }

        incrementloginattempts()
        {
            this.loginattempts++;
            if (this.loginattempts > 5)
            {
                this.lockedout = true;
            }
        }

    }
}