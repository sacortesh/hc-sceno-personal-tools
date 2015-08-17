var mongoose = require('mongoose');

var MiscSchema = new mongoose.Schema;({
            url: String //montrer url

            object: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Object'
            }
        });

module.exports = mongoose.model('Misc', MiscSchema);
