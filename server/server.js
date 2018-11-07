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



// get the connection string from the environment
var con_str = process.env.MONGOCON;
if (!con_str) {
	console.log("No connection string provided in env MONGOCON");
	process.exit();
}

// set some global variables used below (directory, unique filename incrementer, etc)
var pdf_temp_id = 0;
let cwd = process.cwd();
console.log("cwd: " + cwd);

// connect mongoose
mongoose.connect(con_str);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log('connected!');
        // connect to gridfs
	var gridfs = require('mongoose-gridfs')({
	  mongooseConnection: mongoose.connection
	});
	var File = gridfs.model;

	// configure app to use bodyParser()
	// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = 4444;        // set our port

	// ROUTES FOR OUR API
	// =============================================================================
        // use multer package to store files uploaded as multipart data in memory
	var router = express.Router();              // get an instance of the express Router
	var storage = multer.memoryStorage();
	var upload = multer({ storage: storage });

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });
	});
	router.route('/policy')

                // a post request on /api/policy that is the add policy functionality
		.post(upload.single('pdf'), function(req, res) {
			console.log("found a post request");
			var raw_policy = new Raw();
                        if (req.body.title === 'undefined' || req.body.title === "") {
                            res.send("no title set");
                            return
                        }
			raw_policy.title = req.body.title;

			// do conversion to text and to pdf
			if (!req.body.content && typeof req.file !== 'undefined' && req.file) {
				// convert pdf to text
				raw_policy.pdf = req.file.buffer;
//				console.log('file buffer content: ' + req.file.buffer.toString());
				// put the data in a file
				var filename = cwd + "/save" + "/pdf2text" + pdf_temp_id + ".pdf";
				var text_filename = cwd + "/save" + "/pdf2text" + pdf_temp_id + ".txt";
                                pdf_temp_id = pdf_temp_id + 1;       
				var createStream = fs.createWriteStream(filename);
				createStream.write(req.file.buffer);
				createStream.end();
				let pdf2text = spawn('/usr/bin/pdftotext', [filename, text_filename]);
				console.log('spawned pdf2text');
				pdf2text.on('close', (code) => {
					if (code != 0) {
						console.log('pdf2text failed with code: ' + code);
					}
                                        // now we can load the text into the raw_policy.content
                                        fs.readFile(text_filename, (err, data) => {
                                            if (err)
                                                console.log("error " + err + " opening file " + text_filename);
                                            console.log("got pdf2text text: \n" + data);
                                            raw_policy.content = data;
                                            raw_policy.save(function(err) {
                                                    if (err)
                                                            res.send(err);

                                                    res.json({ message: 'Raw policy created!', id: raw_policy.id });
                                            });
                                        });
				});

			} else if (typeof req.file === 'undefined' && req.body.content) {
				console.log("starting text to pdf");
				raw_policy.content = req.body.content;
				// convert text to pdf
				var contentstream = stream.Writable();
				var doc = new PDFDocument();
				contentstream._write = function(chunk, encoding, done) {
					console.log("writing to raw policy content from pdf data");
					raw_policy.pdf =raw_policy.pdf + chunk.toString();
				};
				doc.pipe(contentstream);
				doc.text(raw_policy.content);
				doc.end();
                                raw_policy.save(function(err) {
                                        if (err)
                                                res.send(err);

                                        res.json({ message: 'Raw policy created!', id: raw_policy.id });
                                });

			} else {
				// error because no data provided
				res.send("error: no data provided");

			}

		})
                
                // functionality for a get request on /api/policy should be a getall data objects
		.get(function(req, res) {
			Raw.find(function (err, products) {
				if (err)
					res.send(err);
				res.json(products);
			});
		});


	router.route('/policy/:raw_id')

                // get on /api/policy/number will get the policy associated with that unique id
		.get(function(req, res) {
			Raw.findById(
				req.params.raw_id,
				function(err, raw_policy) {
					if (err)
						res.send(err);

					res.json(raw_policy);
				});
		})


                // allow deletion of policies based on their unique mongo id
		.delete(function(req, res) {
			Raw.remove({
				_id: req.params.raw_id
			}, function(err, raw_policy) {
				if (err)
					res.send(err);

				res.json({message: 'Successfully deleted' });
			});
		});


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
