var mongoose = require('mongoose');

var StatSchema = new mongoose.Schema;({
        name: String, //attribute
        val_min: Number, //valeur maximale
        val_max: Number, //valeur unitaire
        url_interaction: String, //url à faire requete get
        field: String, //champ à prendre en compte au moment de faire requete
        unit: String //unité à montrer
        object: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Object'
        }
    });

module.exports = mongoose.model('Stat', StatSchema);
