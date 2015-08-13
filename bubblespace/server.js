//BASE SETUP===================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var port = process.env.PORT || 1992;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://user:gogoptl@ds059702.mongolab.com:59702/content-generator');


var Obj = require('./app/models/object')

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
app.get('/objectlist', function (req,res){
    console.log("Obtaining objects");

    Obj.find(function(err, data){
            if(err)
                res.send(err);
            res.json(data);
        })

});

/*
app.get('/', function(request, response){
    console.log("Route root detected");
    response.render(404,
    {
        title:"404 Not Found"
    });
});
*/

/*
app.get('/admin', function(request, response) {
    console.log("Route api detected");
    response.render('admin',
        {title:"Administration des services",
        servicesPublished:services.getPublishedServices()
    });
});
*/

/*
app.get('/service/:id', function(request, response) {

    var id = request.params.id;
    var xmlObtained = null;
    var transformed;
    var dataSent = null;
    var serviceValide = true;

    if (id == "magestic"){

        //Cette space est vide car toute la fonctionalité était mieux place cote client que coté serveur.
        //C'est pas toujours le même cas.

    }

    else
    {
        serviceValide = false
    }

    if (serviceValide){
        console.log("Routing to service: " + id);
        var ser = services.getPublishedService(id);
        response.render(id,
        {
            title:ser.title,
            data:dataSent
        })
    } else{
        console.log("Service " + id + " undefined");
        response.render(404,
        {
            title:"404 Not Found"
        });
    }



});
*/


app.post('/objectlist', function (req, res){

    console.log("Posting to server");


    var obj = new Obj();
    obj.name = req.body.name;
    obj.description = req.body.description;

    obj.save(function(err){
        if (err){
            res.send(err);
        }
        console.log("Object created")
    })
})


//todo Si la route n'est pas geré, donc afficher la page d'erreur


//BOOTING UP===================================================
app.use(router);
app.listen(port);
console.log('Listening for action on port ' + port);
