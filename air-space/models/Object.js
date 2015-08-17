var mongoose = require('mongoose');

var ObjectSchema = new mongoose.Schema;({
    name: String, //nom
    description: String, //description
    specs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spec'
    }],
    stats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stat'
    }],
    actions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Action'
    }],
    miscs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Misc'
    }
});

module.exports = mongoose.model('Object', ObjectSchema);
