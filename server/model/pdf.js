var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var PdfPolicySchema = new Schema({
	filename: String,

});
module.exports = mongoose.model('Pdf', PdfPolicySchema);


