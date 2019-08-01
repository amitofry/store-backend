const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const UserRouter = express.Router();
let fs = require('fs');
let dbFile = "dataBase.json";
const Login = require('./login');
const loginManager = new Login();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/LoginUser', function(req, res) {
    const userDetails = req.body;
    
    res.send({
        isLoggedIn: loginManager.logIn(userDetails.userName, userDetails.password)
    }); 
});

app.post('/SignupUser', function(req, res) {
    const userDetails = req.body;
    
    res.send({
        isSignedUp: loginManager.signUp(userDetails.userName, userDetails.password, userDetails.passwordRetype)
    }); 
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))