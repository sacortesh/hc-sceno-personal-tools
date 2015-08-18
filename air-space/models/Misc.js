var mongoose = require('mongoose');

var MiscSchema = new mongoose.Schema({
            url: String ,//montrer url

            object: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Object'
            }
        });

mongoose.model('Misc', MiscSchema);
