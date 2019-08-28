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
        const loggedUser = db.users.find((user)=>{
            return user.userName === userName;
        })

        if(loggedUser !== undefined)
        {
            return false;
        }

        db.users[db.users.length] = {
            userName,
            password,
            favorites : [],
            cart : []
        }
        this.dbManager.writeDataObjectToDatabase(db)

        return true;

    }

    getUsers(){
        let db = this.dbManager.getDatabaseObject();
        
        return db.users;
    }
    
    deleteUser(userObj) {
        let db = this.dbManager.getDatabaseObject();

        let indexUser = db.users.findIndex(user => user.userName === userObj.userName)
        
        db.users.splice(indexUser, 1)
        this.dbManager.writeDataObjectToDatabase(db)

        return (
            {
                users : db.users,
                isUserDeleted :true
            }
        )
    }
}

module.exports = LoginManager;