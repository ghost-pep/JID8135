var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RawSchema   = new Schema({
    title: String,
	content: String
});

module.exports = mongoose.model('Raw', RawSchema);
