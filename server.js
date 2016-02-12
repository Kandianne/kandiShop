"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var env = require('dotenv').config();
var port = process.env.PORT || 3000;

app.set('views', './views');
app.engine('.html', require('ejs').renderFile);
app.use(express.static('./public'));
app.use(express.static('./bower_components'));
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//-----------------------CONNECTION TO MONGOOSE--------------------------------------------------------

mongoose.connect(process.env.MONGOLAB_URI, function(err) {
	if(err) return console.log("No connection");
	else{
		console.log("Success! You are connected to the database")
	}
});

//======================REQUIRING SCHEMAS=================================
require("./models/CandyModel");

//======================REQUIRING ROUTES=================================
var candyRoutes = require('./routes/candyRoutes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.render('index');
});

//======================ROUTES TO USE=================================
app.use('/api/candy/', candyRoutes);


module.exports = app.listen(port, function() {
	console.log('Example app listening at http://localhost:' + port);
});
