// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var fs		   = require('fs');

var con_str = process.env.MONGOCON;

// connect mongoose
mongoose.connect(con_str);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log('connected!');

	// instantiate the schemas
	var rawPolicySchema = new mongoose.Schema({
		title: String,
		content: String
	});

	//instantiate mongoose-gridfs
	//var gridfs = require('mongoose-gridfs')({
	//	mongooseConnection: mongoose.connection
	//});

	// configure ap to use bodyParser()
	// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = 4444;        // set our port

	// ROUTES FOR OUR API
	// =============================================================================
	var router = express.Router();              // get an instance of the express Router

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });   
	});
	router.post('/policy/add/raw', (req, res) => {
	});

	//router.get('/policy/add'......
	//router.get('/policy/delete'......
	//router.get('/policy/download'......

	// more routes for our API will happen here

	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/api', router);

	// START THE SERVER
	// =============================================================================
	app.listen(port);
	console.log('Magic happens on port ' + port);

});
