const DbManager = require('./dbManagement');

class ProductsManager {    
    constructor() {
        this.dbManager = new DbManager('./dataBase.json');        
    }

    getProducts() {
        const products = this.dbManager.getDatabaseObject().products;
        return products;
    }
}

module.exports = ProductsManager;