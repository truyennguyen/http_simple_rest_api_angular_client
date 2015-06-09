'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

app.use(express.static(__dirname + '/build'));

var booksRoutes = express.Router();
var usersRoutes express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/books_development');

app.use(passport.initialize());

require('./lib/passport_strategies')(passport);
require('./routes/books_routes')(booksRoutes);
require('./routes/auth_routes')(usersRoutes, passport);

app.use('/api', booksRoutes);
app.use('/api', usersRoutes);

app.listen(process.env.PORT || 3000, function(){
	console.log('server running on port ' + (process.env.PORT || 3000));
});