//server.js

var express = require('express')
var app = express();
var cool = require('cool-ascii-faces');
var mongoose 	= require('mongoose');
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// Conexión con la base de datos
var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
		|| 'mongodb://localhost/rest_api_nodejs';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
	var Puntuacion = mongoose.model('Puntuacion', {
		nombre : String,
		puntos : Number
	});
	
	var Categoria = mongoose.model('Categoria', {
		nombre : String,
		clave : String
	});
// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all puntuaciones
	app.get('/api/puntuaciones', function(req, res) {

		// use mongoose to get all puntuaciones in the database
		Puntuacion.find(function(err, puntuaciones) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(puntuaciones); // return all puntuaciones in JSON format
		});
	});

	// create puntuacion and send back all puntuaciones after creation
	app.post('/api/puntuaciones', function(req, res) {

		// create a puntuacion, information comes from AJAX request from Angular
		Puntuacion.create({
			nombre : req.body.nombre,
			puntos : req.body.puntos,
			done : false
		}, function(err, puntuacion) {
			if (err)
				res.send(err);

			// get and return all the puntuaciones after you create another
			Puntuacion.find(function(err, puntuaciones) {
				if (err)
					res.send(err)
				res.json(puntuaciones);
			});
		});

	});

		// delete a puntuacion
	app.delete('/api/puntuaciones/:puntuacion_id', function(req, res) {
		Puntuacion.remove({
			_id : req.params.puntuacion_id
		}, function(err, puntuacion) {
			if (err)
				res.send(err);

			// get and return all the puntuaciones after you create another
			Puntuacion.find(function(err, puntuaciones) {
				if (err)
					res.send(err)
				res.json(puntuaciones);
			});
		});
	});
	
		// api ---------------------------------------------------------------------
	// get all categorias
	app.get('/api/cuentas/categorias', function(req, res) {

		// use mongoose to get all categorias in the database
		Categoria.find(function(err, categorias) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(categorias); // return all categorias in JSON format
		});
	});

	// create categoria and send back all categorias after creation
	app.post('/api/cuentas/categorias', function(req, res) {

		// create a categoria, information comes from AJAX request from Angular
		Categoria.create({
			nombre : req.body.nombre,
			clave : req.body.clave,
			done : false
		}, function(err, categoria) {
			if (err)
				res.send(err);

			// get and return all the categorias after you create another
			Categoria.find(function(err, categorias) {
				if (err)
					res.send(err)
				res.json(categorias);
			});
		});

	});
	
	// delete a categoria
	app.delete('/api/cuentas/categoria/:categoria_id', function(req, res) {
		Categoria.remove({
			_id : req.params.categoria_id
		}, function(err, categoria) {
			if (err)
				res.send(err);

			// get and return all the categorias after you create another
			Categoria.find(function(err, categorias) {
				if (err)
					res.send(err)
				res.json(categorias);
			});
		});
	});

	app.get('/test', function(request, response) {
	  response.send(cool());
	});

	// application -------------------------------------------------------------
	app.get('/api/cuentas', function(request, response){
		response.sendfile('./public/apicategoria.html');
	});
	
	app.get('*', function(request, response) {
		response.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

mongoose.connect(uristring, function(err, res) {
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log('Succeeded connected to: ' + uristring);
	}
});