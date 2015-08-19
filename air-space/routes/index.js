var express = require('express');
var router = express.Router();
var ip = require('./backend-helpers')

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

/**
General APIs for object finding and population
**/

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

router.get('/api/ip', function(req, res, next){
    var ipf = ip.getIPLocal();
    res.json({ip: ipf});
})

/**
Parameter APIS
**/

router.param('object', function(req,res,next,id){
    var query = Obj.findById(id);

    query.exec(function(err,object){
        if(err){return next(err);}
        if(!object){return next(new Error('BE: Unable to find associated object'));}

        req.object = object;
        return next();
    });
});

//Might not get used, maybe in the updates and deletes

router.param('spec', function(req,res,next,id){
    var query = Spec.findById(id);

    query.exec(function(err,spec){
        if(err){return next(err);}
        if(!spec){return next(new Error('BE: Unable to find associated object specification'));}

        req.spec = spec;
        return next();
    });
});

router.param('stat', function(req,res,next,id){
    var query = Stat.findById(id);

    query.exec(function(err,stat){
        if(err){return next(err);}
        if(!stat){return next(new Error('BE: Unable to find associated object status'));}

        req.stat = stat;
        return next();
    });
});

router.param('action', function(req,res,next,id){
    var query = Action.findById(id);

    query.exec(function(err,action){
        if(err){return next(err);}
        if(!action){return next(new Error('BE: Unable to find associated object action'));}

        req.action = action;
        return next();
    });
});

router.param('misc', function(req,res,next,id){
    var query = Misc.findById(id);

    query.exec(function(err,misc){
        if(err){return next(err);}
        if(!misc){return next(new Error('BE: Unable to find associated object various'));}

        req.misc = misc;
        return next();
    });
});

/**
Specific Object APIS

Since in escence we are going to get all the stuff frrom one blow, getters for specific parts are not required... Maybe

**/

router.get('/api/objects/:object', function(req, res, next){
    req.object.populate('specs').populate('stats').populate('actions').populate('miscs', function(err, object){
        if (err) { return next(err);}
        res.json(object);
    });
});

/**
Post APIs for parts of the object
**/

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


router.post('/api/objects/:object/stats', function(req, res, next){
    var stat = new Stat(req.body);

    stat.object = req.object;

    stat.save(function(err, stat){
        if(err){return next(err);}

        req.object.stats.push(stat);
        req.object.save(function(err,object){
            if (err) {return next(err)};

            res.json(stat);
        });
    });
});

router.post('/api/objects/:object/actions', function(req, res, next){
    var action = new Action(req.body);

    action.object = req.object;

    action.save(function(err, action){
        if(err){return next(err);}

        req.object.actions.push(action);
        req.object.save(function(err,object){
            if (err) {return next(err)};

            res.json(action);
        });
    });
});

router.post('/api/objects/:object/misc', function(req, res, next){
    var misc = new Misc(req.body);

    misc.object = req.object;

    misc.save(function(err, misc){
        if(err){return next(err);}

        req.object.miscs.push(misc);
        req.object.save(function(err,object){
            if (err) {return next(err)};

            res.json(misc);
        });
    });
});