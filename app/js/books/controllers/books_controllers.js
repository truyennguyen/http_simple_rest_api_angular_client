'use strict';

module.exports = function(app) {
  app.controller('booksController', ['$scope', 'RESTResource', function($scope, resource) {
    var Book = resource('books');

    $scope.errors = [];
    $scope.books = [];

    $scope.getAll = function() {
      Book.getAll(function(err, data){
        if(err)
          return $scope.errors.push({msg: "error getting books"});
        $scope.books = data;
      });
    };

    $scope.createNewBook = function(book) {
      var newBook = angular.copy(book);
      $scope.books.push(newBook);
      Book.create(newBook, function(err, data){
        if(err)
          return $scope.errors.push({msg: "could not add book" + newBook.name});
        $scope.books.splice($scope.books.indexOf(newBook), 1, data);
      });
    };

	$scope.editBook = function(book) {
			book.editing = true;
			$scope.bookUndEdit = angular.copy(book);
	};

	$scope.cancelEdit = function(book) {
			book.name = $scope.bookUndEdit.name;
			book.author = $scope.bookUndEdit.author;
			book.price = $scope.bookUndEdit.price;
			$scope.bookUndEdit = null;
      book.editing = false;
	};

    $scope.removeBook = function(book) {
      $scope.books.splice($scope.books.indexOf(book), 1);
      Book.remove(book, function(err, data){
        if(err)
          return $scope.errors.push({msg: 'could not remove book' + book.name})
      });
    };

    $scope.saveBook = function(book) {
      Book.save(book, function(err, data){
        if(err)
          return $scope.errors.push({msg: 'could not update book'});
      });
      book.editing = false;
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
    };
  }]);
};
