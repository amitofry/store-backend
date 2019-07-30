const DbManager = require('./dbManagement');

class LoginManager {    
    constructor() {
        this.dbManager = new DbManager('./dataBase.json');        
    }

    logIn(userName, password) {
        const users = this.dbManager.getDatabaseObject().users;
        const loggedUser = users.find((user)=>{
            return user.userName === userName && user.password === password;
        })

        return loggedUser !== undefined;
    }

    signUp(userDetails) {
        // write to db.
        // save.
        // return userDetails
    }
    
    deleteUser() {        
        // delete user from db
        // return true or false if error.
    }
}

module.exports = LoginManager;