//Calling includes

//BASE SETUP===================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var port = process.env.PORT || 9092;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://user:gogoptl@ds059672.mongolab.com:59672/demo-lamps');

var Lamp = require('./app/models/lamp')

//ROUTES===================================================
//Obtaining data from a POST req.

var router = express.Router();

//logging all requests or middleware
router.use(function(req, res, next){
    console.log('Something is happening.');
    next();  //Continue routing
});

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');

    next();
});

//Testing the route
router.get('/', function(req,res){
    res.json({message: "Welcome to the jungle!!!"});
});

router.route('/lamps')
    .post(function(req,res){
        var lamp = new Lamp();
        lamp.name = req.body.name;
        lamp.status = 0;

        lamp.save(function(err){
            if(err)
                res.send(err);
            res.json({message:'Lamp created!'});
        });
    })
    .get(function(req,res){
        Lamp.find(function(err, lamps){
            if(err)
                res.send(err);
            res.json(lamps);
        })
    });

//individual routes
router.route('/lamps/:lamp_id')
    .get(function(req, res){
        Lamp.findById(req.params.lamp_id, function(err,lamp){
            if(err)
                res.send(err);
            res.json(lamp);
        });
    })
    .put(function(req, res){
        Lamp.findById(req.params.lamp_id, function(err,lamp){
            if(err)
                res.send(err);

            lamp.name = req.body.name;
            lamp.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Lamp updated'});
            });

        });
    })
    .delete(function(req,res){
        Lamp.remove({
            _id: req.params.lamp_id
        }, function(err, bear){
            if(err)
                res.send(err);
            res.json({message: 'Successfully deleted'})
        })
    });

//saving an speciific lighht intensity value
router.route('/lamps/:lamp_id/status')
    .get(function(req, res){
        Lamp.findById(req.params.lamp_id, function(err,lamp){
            if(err)
                res.send(err);
            res.json({status: lamp.status});
        });
    })
    .post(function(req, res){
        Lamp.findById(req.params.lamp_id, function(err,lamp){
            if(err)
                res.send(err);

            lamp.status = req.body.status;
            lamp.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Lamp updated'});
            });

        });
    });



//BOOTING UP===================================================

app.use('/api', router);

app.listen(port);
console.log('Listening for action on port ' + port);
