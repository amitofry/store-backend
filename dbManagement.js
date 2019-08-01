const fs = require('fs');

class DbManager {    
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;
        this.readDatabaseFile = this.readDatabaseFile.bind(this)
    }

    readDatabaseFile(dbFilePath) {        
        const data = fs.readFileSync(dbFilePath);
        if (!data) { throw err; }
        return JSON.parse(data);        
    }

    getDatabaseObject() {                
        return this.readDatabaseFile(this.dbFilePath);        
    }

    writeDataObjectToDatabase(dbObject){
        return this.updateDataBase(dbObject,this.dbFilePath)
    }

    updateDataBase(dbObject,dbFilePath) {
        const data = fs.writeFileSync(dbFilePath,JSON.stringify(dbObject));
        return data==undefined; 
    }
}

module.exports = DbManager;