// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var fs		   = require('fs');
var Raw		   = require('./model/raw.js');

var con_str = process.env.MONGOCON;
if (!con_str) {
	console.log("No connection string provided in env MONGOCON");
	process.exit();
}

// connect mongoose
mongoose.connect(con_str);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log('connected!');
	var gridfs = require('mongoose-gridfs')({
	  mongooseConnection: mongoose.connection
	});

	var File = gridfs.model;

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
	router.route('/policy/raw')

		.post(function(req, res) {
			var raw_policy = new Raw();
			raw_policy.title = req.body.title;
			raw_policy.content = req.body.content;

			raw_policy.save(function(err) {
				if (err) {
                    console.log(err);
					res.send(err);
                }
                else {
                    console.log("Raw policy added");
			        res.json({ message: 'Raw policy created!', id: raw_policy.id });
                }
			});
		})
		.get(function(req, res) {
			Raw.find(function (err, products) {
				if (err)
					res.send(err);
                else
				    res.json(products);
			});
		});

    router.route('/policy/pdf')
        .post(function(req, res) {
			//TODO: check if it is actually a pdf
			// or not if we are lazy lmao
			File.write(
				{filename: req.body.filename,
				contentType: 'pdf'},
				fs.createReadStream(req.body.content),
				function(err, createdFile){
					if (err) {
						console.log("there was an error on pdf creation");
						res.send(err);
					} else {
					    res.send({message: "Policy created!", id: File.id });
                    }
				}
			);
        });

	router.route('/policy/pdf/:pdf_id')
		.get(function(req, res) {
			File.readById(
				req.params.pdf_id,
				function(err, pdf_policy) {
				if (err)
					res.send(err);
                else
				    res.send(pdf_policy);
			})
		})

		.delete(function(req, res) {
			File.unlinkById(
				req.params.pdf_id,
				function(err, pdf_policy) {
				if (err)
					res.send(err);
                else
				    res.send({message: 'Successfully deleted'});
			})
		});

	router.route('/policy/raw/:raw_id')
		.get(function(req, res) {
			Raw.findById(
				req.params.raw_id,
				function(err, raw_policy) {
					if (err)
						res.send(err);
                    else
					    res.json(raw_policy);
				});
		})


		.delete(function(req, res) {
			Raw.remove({
				_id: req.params.raw_id
			}, function(err, raw_policy) {
				if (err)
					res.send(err);
                else
				    res.json({message: 'Successfully deleted' });
			});
		});

	router.route('/policy/raw/title/:title')
		.get(function(req, res) {
			Raw.find( { title: req.params.title }, function (err, products) {
				if (err)
					res.send(err);
                else
				    res.json(products);
			});
		});


	router.route('/policy/raw/all')
		.get(function(req, res) {
			Raw.find(function (err, products) {
				if (err)
					res.send(err);
                else
				    res.json(products);
			});
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
