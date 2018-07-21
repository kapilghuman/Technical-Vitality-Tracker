angular.module('addServices', [])

.factory('Add', function($http){
	addFactory = {};
	
	addFactory.create = function(addData){
		return $http.post('/api/adds', addData);
	}
	
	return addFactory;
});
