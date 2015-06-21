'use strict';
require('../../app/js/client');
require('angular-mocks');

describe('book controller', function(){
	var $CC;
	var $httpBackend;
	var $scope;

	beforeEach(angular.mock.module('booksApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		$scope = $rootScope.$new();
		$CC = $controller;
	}));

	it('should be able to create new controller', function(){
		var booksController = $CC('booksController', {$scope: $scope});
		expect(typeof booksController).toBe('object');
		expect(Array.isArray($scope.books)).toBe(true);
		expect(Array.isArray($scope.errors)).toBe(true);
		expect(typeof $scope.getAll).toBe('function');
	});

	describe('REST functionality', function(){
		beforeEach(angular.mock.inject(function(_$httpBackend_){
			$httpBackend = _$httpBackend_;
			this.booksController = $CC('booksController', {$scope: $scope});
		}));

		afterEach(function(){
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should handle errors correctly', function(){
			$httpBackend.expectGET('/api/books').respond(500, {msg: 'server error'});
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('error retrieving books');
		});

		it('should make a get request on index', function(){
			$httpBackend.expectGET('/api/books').respond(200, [{_id: '1', name: 'Dave G', author: 'Nate R', price: '200'}]);
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.books[0].name).toBe('Dave G');
			expect($scope.books[0].author).toBe('Nate R');
			expect($scope.books[0].price).toBe('200');
			expect($scope.books[0]._id).toBe('1');
		});

		it('should be able to save a new book', function(){
			$scope.newBook = {name: 'Dave G', author: 'Nate R', price: '200'};
			$httpBackend.expectPOST('/api/books').respond(200, {_id: '2', name: 'Dave G', author: 'Nate R', price: '200'});
			$scope.createNewBook();
			$httpBackend.flush();
			expect($scope.books[0].name).toBe('Dave G');
			expect($scope.books[0].author).toBe('Nate R');
			expect($scope.books[0].price).toBe('200');
			expect($scope.books[0]._id).toBe('2');
			expect($scope.newBook).toBe(null);
		});

		it('should be able to delete a book', function(){
			var book = {_id: '3', name: 'Dave G', author: 'Nate R', price: '200'};
			$scope.books.push(book);
			$httpBackend.expectDELETE('/api/books/3').respond(200, {msg: 'success!'});

			expect($scope.books.indexOf(book)).not.toBe(-1);
			$scope.removeBook(book);
			expect($scope.books.indexOf(book)).toBe(-1);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(0);
		});

		it('should delete a book even on server error', function(){
			var book = {_id: '4', name: 'Dave G', author: 'Nate R', price: '200'};
			$scope.books.push(book);
			$httpBackend.expectDELETE('/api/books/4').respond(500, {msg: 'yolo'});

			expect($scope.books.indexOf(book)).not.toBe(-1);
			$scope.removeBook(book);
			expect($scope.books.indexOf(book)).toBe(-1);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('could not remove book: Dave G')

		});
	});
});