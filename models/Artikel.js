var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artikelSchema = new Schema({
	title:String,
	description:String,
	category_id:{type: String, ref: 'Category'},
	photo:String
});

module.exports = mongoose.model('Artikel', artikelSchema, 'artikels');