var mongoose = require('mongoose');

var ActionSchema = new mongoose.Schema({
        name: String, //interaction
        val_min: Number, //valeur maximale
        val_max: Number, //valeur minimale
        step: Number, //pas entre valeurs
        url_interaction: String, //url d'interaction par requete
        field: String, //champ à affecter
        unit: String, //unité à montrer
        object: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Object'
        }
    });

mongoose.model('Action', ActionSchema);
