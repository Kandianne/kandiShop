var mongoose = require("mongoose");

var CandySchema = new mongoose.Schema({
	candyName: String,
	unitPrice: Number, 
	stock: Number,
	amountDesired: {type: Number, default: 0},
	addedToShoppingList: {type: Boolean, default: false}
});

mongoose.model("Candy", CandySchema);