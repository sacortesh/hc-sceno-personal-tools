var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectSchema = new Schema({
    name: String,
    description: String,
    specs: [{
            name: String,
            value: String,
            isIMG: Boolean
    }],
    stats: [{
            name: String,
            val_min: Number,
            val_max: Number,
            url_interaction: String,
            field: String,
            unit: String
        }],
        actions: [{
            name: String,
            val_min: Number,
            val_max: Number,
            step: Number,
            url_interaction: String,
            field: String,
            unit: String
        }],
        miscs:{
            url: String
        }
});

module.exports = mongoose.model('Object', ObjectSchema);
