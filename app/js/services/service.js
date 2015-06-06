'use strict'

module.exports = function(app){
	app.factory('RESTResource', ['$http', function($http){
		return function(resourceName){
			return{
				getAll: function(callback){
					$http.get('/api/' + resourceName)
						.success(function(data){
							callback(null, data);
						})
						.error(function(data){
							console.log(data);
							callback(data);
						});
				},

				create: function(resourceData, callback){
					$http.post('/api/' + resourceName, resourceData)
						.success(function(data){
							callback(null, data);
						})
						.error(function(data){
							console.log(data);
							callback(data);
						});
				},

				remove: function(resourceData, callback){
					$http.delete('/api/' + resourceName + '/' + resourceData._id)
						.error(function(data){
							console.log(data);
							callback(data);
						});
				},

				save: function(resourceData, callback){
					$http.put('/api/' + resourceName + '/' + resourceData._id, resourceData)
						.error(function(data){
							console.log(data);
							callback(data);
						});
				}
			}
		}
	}]);
};