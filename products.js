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

    addToCart(productName,userName){
        let db = this.dbManager.getDatabaseObject();

        for (var i = 0; i < db.users.length; i++){
            
            if (db.users[i].userName == userName){
                const productToAdd = db.users[i].cart.find((product)=>{
                    return product === productName;
                })
                if (productToAdd===undefined)
                {
                    db.users[i].cart[db.users[i].cart.length] = productName;
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

    getUserCart(userName)
    {
        let db = this.dbManager.getDatabaseObject();

        for (var i = 0; i < db.users.length; i++){
            
            if (db.users[i].userName == userName){
                    return db.users[i].cart
            }
          }
    }

    purchaseCart(userName)
    {
        let db = this.dbManager.getDatabaseObject();

        for (var i = 0; i < db.users.length; i++){
            
            if (db.users[i].userName == userName){
                db.users[i].cart = []
            }
          }
        this.dbManager.writeDataObjectToDatabase(db)

        return true;
    }
}

module.exports = ProductsManager;