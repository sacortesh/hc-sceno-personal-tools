//Calling includes

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var port = process.env.PORT || 9092;


//Obtaining data from a POST req.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Testing the route
app.get('/', function(req,res){
    res.json({message: "Welcome to the jungle!!!"});
});

app.use('/api',app.router);
app.listen(port);
console.log('Listening for action on port ' + port);
