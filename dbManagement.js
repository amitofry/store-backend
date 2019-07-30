const fs = require('fs');

class DbManager {    
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;        
    }

    readDatabaseFile(dbFilePath) {        
        const data = fs.readFileSync(dbFilePath);
        if (!data) { throw err; }
        return JSON.parse(data);        
    }

    getDatabaseObject() {                
        return this.readDatabaseFile(this.dbFilePath);        
    }

    writeDataObjectToDatabase(dbObject) {
        // ... save to dbFile.
    }
}

module.exports = DbManager;