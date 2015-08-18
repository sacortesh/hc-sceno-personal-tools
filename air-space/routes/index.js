var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var mongoose = require('mongoose');
var Obj = mongoose.model('Object');
var Spec = mongoose.model('Spec');
var Stat = mongoose.model('Stat');
var Action = mongoose.model('Action');
var Misc = mongoose.model('Misc');

router.get('/api/objects', function(req, res, next){
    Obj.find(function(err,objects){
        if(err){return next(err);}

        res.json(objects);
    });
});

router.post('/api/objects', function(req, res, next){
    var obj = new Obj();

    obj.name = req.body.name;
    obj.description = req.body.description;

    obj.save(function(err, obj){
        if(err){
            return next(err);
        }

        res.json(obj);
    });

});

router.param('object', function(req,res,next,id){
    var query = Obj.findById(id);

    query.exec(function(err,object){
        if(err){return next(err);}
        if(!object){return next(new Error('BE: Unable to find associated object'));}

        req.object = object;
        return next();
    });
});

router.param('spec', function(req,res,next,id){
    var query = Spec.findById(id);

    query.exec(function(err,spec){
        if(err){return next(err);}
        if(!spec){return next(new Error('BE: Unable to find associated object specification'));}

        req.spec = spec;
        return next();
    });
});

router.get('/api/objects/:object', function(req, res, next){
    req.object.populate('specs', function(err, object){
        if (err) { return next(err);}
        res.json(object);
    });
});

router.post('/api/objects/:object/specs', function(req,res, next){
    var spec = new Spec(req.body);

    spec.object = req.object;

    spec.save(function(err, spec){
        if(err){return next(err);}

        req.object.specs.push(spec);
        req.object.save(function(err,object){
            if (err) {return next(err)};

            res.json(spec);
        });
    });
});