'use strict';

module.exports = function(app){
	app.directive('bookFormDirective', function(){
		return{
			restrict: 'A',
			templateUrl: '/js/directives/book_form.html'			
		};
	});
};