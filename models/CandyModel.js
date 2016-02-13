var mongoose = require("mongoose");

//=================MONGOOSE MODEL OF HOW I WANT MY OBJECT TO BE CONSTRUCTED====================
var CandySchema = new mongoose.Schema({
	candyName: String,
	unitPrice: Number, 
	stock: Number,
	amountDesired: {type: Number, default: 0},
	addedToShoppingList: {type: Boolean, default: false}
});

mongoose.model("Candy", CandySchema);