var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RawSchema   = new Schema({
    title: String,
	content: String,
	pdf: String
});

module.exports = mongoose.model('Raw', RawSchema);
