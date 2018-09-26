var mongoose = require('mongoose')
var Schema = mongoose.Schema

var gridfs = require('mongoose-gridfs')({
  collection:'policies',
  model:'PdfPolicy',
  mongooseConnection: mongoose.connection
});

var PdfPolicySchema = gridfs.schema

module.export = mongoose.model('PdfPolicy', PdfPolicySchema)
