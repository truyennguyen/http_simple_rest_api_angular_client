'use strict';

require('angular/angular');

var booksApp = angular.module('booksApp', []);

require('./books/controllers/books_controllers')(booksApp);

require('./directives/directive')(booksApp);

require('./services/service')(booksApp);