const DbManager = require('./dbManagement');

class ProductsManager {    
    constructor() {
        this.dbManager = new DbManager('./dataBase.json');        
    }

    getProducts() {
        const products = this.dbManager.getDatabaseObject().products;
        return products;
    }

    addToFavorites(productName,userName){
        let db = this.dbManager.getDatabaseObject();

        for (var i = 0; i < db.users.length; i++){
            
            if (db.users[i].userName == userName){
                const favroiteProduct = db.users[i].favorites.find((product)=>{
                    return product === productName;
                })
                if (favroiteProduct===undefined)
                {
                    db.users[i].favorites[db.users[i].favorites.length] = productName;
                }
            }
          }
        this.dbManager.writeDataObjectToDatabase(db)

        return true; 
    }

    getUserFavorites(userName)
    {
        let db = this.dbManager.getDatabaseObject();

        for (var i = 0; i < db.users.length; i++){
            
            if (db.users[i].userName == userName){
                    return db.users[i].favorites
            }
          }
    }
}

module.exports = ProductsManager;