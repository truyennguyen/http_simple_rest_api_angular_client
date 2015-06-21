'use strict';

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	name: {type: String, require: true},
	author: { type: String, default: "anonymous"},
	price: {type: String, default: "0"}
});

module.exports = mongoose.model("Book", bookSchema);