var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Candy = mongoose.model('Candy');


//=============================CREATING CANDY INVENTORY LIST===============================
router.post('/', function(req, res) {
	console.log(req.body, "9 routes");
	var newCandy = new Candy(req.body);
	newCandy.save(function(err, result) {
		if(err) return res.status(500).send({err:'The server is having issues.'});
		if(!result) return res.status(400).send({err: 'Sorry, I could not create the candy product'});
		res.send();
	});
});

//==============================GETTING CANDIES IN INVENTORY===============================
router.get('/', function(req, res) {
	Candy.find({})
	.exec(function(err, candies) {
		if(err) return res.status(500).send({err:'The server is having issues.'});
		if(!candies) return res.status(400).send({err: 'Sorry, I could not get the candies'});
		res.send(candies);
	});
});

//==============================GETTING CANDIES IN BASKET===============================
router.get('/shoppingBasket', function(req, res) {
	Candy.find({addedToShoppingList: true})
	.exec(function(err, shoppingBasket) {
		if(err) return res.status(500).send({err:'The server is having issues.'});
		if(!shoppingBasket) return res.status(400).send({err: 'Sorry, I could not get the candies'});
		res.send(shoppingBasket);
	});
});

//====================UPDATING CANDIES TO DISPLAY IN SHOPPING LIST=========================
router.post('/addToBasket', function(req, res) {
	var qtyRequested = req.body.amountDesired;
	Candy.findByIdAndUpdate({_id:req.body.idOfCandy}, { $set: { addedToShoppingList: true}, $inc: {stock: -qtyRequested, amountDesired: qtyRequested} }, function(err, result) {
		if(err) return res.status(500).send({err:'The server is having issues.'});
		if(!result) return res.status(400).send({err: 'Sorry, I could not find that candy'});
		res.send();
	});
});

//====================UPDATING CANDIES TO DELETE FROM SHOPPING LIST=========================
router.post('/deleteFromBasket', function(req, res) {
	Candy.findByIdAndUpdate({_id:req.body.id}, { $set: { addedToShoppingList: false}, $inc: {stock: +req.body.amt, amountDesired: -req.body.amt} }, function(err, result) {
		if(err) return res.status(500).send({err:'The server is having issues.'});
		if(!result) return res.status(400).send({err: 'Sorry, I could not find that candy'});
		res.send();
	});
});



module.exports = router;