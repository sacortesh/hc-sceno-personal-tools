var mongoose = require('mongoose');

var SpecSchema = new mongoose.Schema;({
            name: String, //attribute
            value: String, //valeur
            isIMG: Boolean //control value pour montrer image
            object: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Object'
            }
        });

module.exports = mongoose.model('Spec', SpecSchema);
