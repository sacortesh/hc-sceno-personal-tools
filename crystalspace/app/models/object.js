var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectSchema = new Schema({
    name: String, //nom
    description: String, //description
    specs: [{
            name: String, //attribute
            value: String, //valeur
            isIMG: Boolean //control value pour montrer image
    }],
    stats: [{
            name: String, //attribute
            val_min: Number, //valeur maximale
            val_max: Number, //valeur unitaire
            url_interaction: String, //url à faire requete get
            field: String, //champ à prendre en compte au moment de faire requete
            unit: String //unité à montrer
        }],
        actions: [{
            name: String, //interaction
            val_min: Number, //valeur maximale
            val_max: Number, //valeur minimale
            step: Number, //pas entre valeurs
            url_interaction: String, //url d'interaction par requete
            field: String, //champ à affecter
            unit: String //unité à montrer
        }],
        miscs:{
            url: String //montrer url
        }
});

module.exports = mongoose.model('Object', ObjectSchema);
