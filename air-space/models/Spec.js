var mongoose = require('mongoose');

var SpecSchema = new mongoose.Schema({
            name: String, //attribute
            value: String, //valeur
            isImg: Boolean, //control value pour montrer image
            object: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Object'
            }
        });

mongoose.model('Spec', SpecSchema);
