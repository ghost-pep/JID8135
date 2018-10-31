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
var multer     = require('multer');
var PDFDocument = require('pdfkit');
const spawn		= require('child_process').spawn;
const stream = require('stream');



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
	var storage = multer.memoryStorage();
	var upload = multer({ storage: storage });

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });
	});
	router.route('/policy')

		.post(upload.single('pdf'), function(req, res) {
			console.log("found a post request");
			var raw_policy = new Raw();
			raw_policy.title = req.body.title;

			// do conversion to text and to pdf
			if (!req.body.content && typeof req.file !== 'undefined' && req.file) {
				// convert pdf to text
				raw_policy.pdf = req.file.buffer;
				const pdf2text = spawn('/usr/bin/pdftotext');
				console.log('spawned pdf2text');
//				console.log('file buffer content: ' + req.file.buffer.toString());
				// put the data in a file
				var child_pid = pdf2text.pid;
				var filename = "pdf2text" + child_pid + ".pdf";
				var createStream = fs.createWriteStream(filename);
				createStream.write(req.file.buffer.toString());
				createStream.end();
				pdf2text.stdin.write(filename);
				pdf2text.stdout.on('data', (data) => {
					console.log('setting content from the pdf content');
					raw_policy.content = data;
				});
				pdf2text.on('close', (code) => {
					if (code != 0) {
						console.log('pdf2text failed with code: ' + code);
					}
				});

			} else if (typeof req.file === 'undefined' && req.body.content) {
				console.log("starting text to pdf");
				raw_policy.content = req.body.content;
				// convert text to pdf
				var contentstream = stream.Writable();
				var doc = new PDFDocument();
				doc.pipe(contentstream);
				doc.text(raw_policy.content);
				doc.end();
				contentstream._write = function(chunk, encoding, done) {
					console.log("writing to raw policy content from pdf data");
					raw_policy.content = raw_policy.content + chunk.toString();
				};

			} else if (!raw_policy.pdf && !raw_policy.content) {
				// error because no data provided
				res.send("error: no data provided");

			}

			/**
			var cp = require('child_process');
			var optipng = require('pandoc-bin').path; //This is a path to a command
			var child = cp.spawn(optipng, ['--from=markdown', '--to=html']); //the array is the arguments

			child.stdin.write('# HELLO'); //my command takes a markdown string...

			child.stdout.on('data', function (data) {
				console.log('stdout: ' + data);
			});
			child.stdin.end();
			**/


			// create child
			// pass the input to the child
			/*
			var stdinStream = new stream.Readable();
			stdinStream.push(input);  // Add data to the internal queue for users of the stream to consume
			stdinStream.push(null);   // Signals the end of the stream (EOF)
			stdinStream.pipe(child.stdin);
			*/

			raw_policy.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Raw policy created!', id: raw_policy.id });
			});
		})
		.get(function(req, res) {
			Raw.find(function (err, products) {
				if (err)
					res.send(err);
				res.json(products);
			});
		});


	router.route('/policy/:raw_id')
		.get(function(req, res) {
			Raw.findById(
				req.params.raw_id,
				function(err, raw_policy) {
					if (err)
						res.send(err);

					res.json(raw_policy);
				});
		})


		.delete(function(req, res) {
			Raw.remove({
				_id: req.params.raw_id
			}, function(err, raw_policy) {
				if (err)
					res.send(err);

				res.json({message: 'Successfully deleted' });
			});
		});



	//router.get('/policy/add'......
	//router.get('/policy/delete'......
	//router.get('/policy/download'......

	// more routes for our API will happen here

	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/api', router);
	app.use(function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	});

	// START THE SERVER
	// =============================================================================
	app.listen(port);
	console.log('Magic happens on port ' + port);

});
