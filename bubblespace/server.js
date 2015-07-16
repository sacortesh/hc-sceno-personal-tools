//BASE SETUP===================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var port = process.env.PORT || 1992;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES===================================================
//Obtaining data from a POST req.

var router = express.Router();

//logging all requests or middleware
router.use(function(req, res, next){
    console.log('Something is happening.');
    next();  //Continue routing
});

//Testing the route
router.use(express.static(__dirname + "/public"));


//BOOTING UP===================================================
app.use(router);
app.listen(port);
console.log('Listening for action on port ' + port);
