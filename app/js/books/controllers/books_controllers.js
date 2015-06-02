'use strict';

module.exports = function(app) {
  app.controller('booksController', ['$scope', '$http', function($scope, $http) {
    $scope.errors = [];
    $scope.books = [];

    $scope.getAll = function() {
      $http.get('/api/books')
        .success(function(data) {
          $scope.books = data;
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'error retrieving books'});
        });
    };

    $scope.createNewBook = function() {
      $http.post('/api/books', $scope.newBook)
        .success(function(data) {
          $scope.notes.push(data);
          $scope.newBook = null; 
        })
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not create new book'});
        })
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
      $http.delete('/api/books/' + book._id)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not remove book: ' + book.name});
        });
    };

    $scope.saveBook = function(book) {
      book.editing = false;
      $http.put('/api/books/' + book._id, book)
        .error(function(data) {
          console.log(data);
          $scope.errors.push({msg: 'could not update book'});
        });
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  }]);
};
