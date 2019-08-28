const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const UserRouter = express.Router();
let fs = require('fs');
let dbFile = "dataBase.json";
const Login = require('./login');
const loginManager = new Login();
const Products = require('./products')
const productsManager = new Products();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/', (req, res) => res.send('Hello World!'))

app.post('/LoginUser', function(req, res) {
    const userDetails = req.body;
    
    res.json({
        userName: userDetails.userName,
        isLoggedIn: loginManager.logIn(userDetails.userName, userDetails.password)
    });  
});

app.post('/SignupUser', function(req, res) {
    const userDetails = req.body;
    
    res.send({
        userName: userDetails.userName,
        isSignedUp: loginManager.signUp(userDetails.userName, userDetails.password, userDetails.passwordRetype)
    }); 
});

app.post('/DeleteUser', function(req, res) {
    const userName = req.body;

    let response = loginManager.deleteUser(userName);
    
    res.send({
        users: response.users,
        isUserDeleted: response.isUserDeleted
    }); 
});

app.get('/GetProducts', function(req, res) {
    const products = productsManager.getProducts();
    res.json(products)
});

app.post('/AddProductToFavorites', function(req, res) {
    const product = req.body.product;
    const userName = req.body.userName
    
    res.send({
        isAddedToFavorites: productsManager.addToFavorites(product, userName)
    }); 
});

app.post('/AddProductToCart', function(req, res) {
    const product = req.body.product;
    const userName = req.body.userName
    
    res.send({
        isAddedToCart: productsManager.addToCart(product, userName)
    }); 
});


app.get('/getUserFavorites/:userName', function(req, res) {
    const favorites = productsManager.getUserFavorites(req.params.userName)
    
    res.json(favorites)
});

app.get('/getUserCart/:userName', function(req, res) {
    const cart = productsManager.getUserCart(req.params.userName)
    
    res.json(cart)
});

app.post('/purchaseCart/:userName', function(req, res) {
    const userName = req.params.userName
    
    res.send({
        isCartPurchased: productsManager.purchaseCart(userName)
    }); 
});

app.get('/getUsers', function(req, res) {
    const users = loginManager.getUsers()
    
    res.json(users)
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))