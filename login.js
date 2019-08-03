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

    signUp(userName, password, passwordRetype) {
        let db = this.dbManager.getDatabaseObject();
        //check if he is logged in already
        db.users[db.users.length] = {
            userName,
            password,
            favorites : []
        }
        this.dbManager.writeDataObjectToDatabase(db)

        return true;

    }
    
    deleteUser() {        
        // delete user from db
        // return true or false if error.
    }
}

module.exports = LoginManager;