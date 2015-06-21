'use strict';

var Book = require('../models/Book');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router){
	router.use(bodyparser.json());

	//Get all books
	router.get('/books', eatAuth, function(req, res){
		Book.find({}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	//get books by id
	router.get("/books/:id", eatAuth, function(req, res) {
		Book.findById(req.params.id, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: "internal server error"});
			}
			res.json(data);
		});
	});

	router.post('/books', eatAuth, function(req, res){
		var newBook = new Book(req.body);
		newBook.save(function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	//update the book by id
	router.put('/books/:id', eatAuth, function(req, res){
		Book.findById(req.params.id, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: "internal server error"});
			}

			data.name = req.body.name;
			data.author = req.body.author;
			data.price = req.body.price;
			data.timeStamp = Date.now;
			data.save(function(err){
				if(err){
					console.log(err);
					return res.status(500).json({msg: "internal server error"});
				}
				res.json({msg:"success"});
			})
		});
	});

	router.delete('/books/:id', eatAuth, function(req, res){
		Book.remove({'_id': req.params.id}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json({msg: 'success'});
		});
	});

	router.delete('/books/deletebook/:bookName', eatAuth, function(req, res){
		Book.remove({'name': req.params.bookName}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json({msg: 'success'});
		});
	});
};