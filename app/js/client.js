'use strict';

require('angular/angular');

var booksApp = angular.module('booksApp', []);

require('./books/controllers/books_controllers')(booksApp);