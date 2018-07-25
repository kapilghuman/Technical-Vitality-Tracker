angular.module('addServices', [])

.factory('Add', function($http){
	addFactory = {};
	
	addFactory.create = function(addData){
		return $http.post('/api/adds', addData);
	}
	
	addFactory.getAccomplishments = function() {
      		return $http.get('/api/accomplishment/');  
    	};
	
	return addFactory;
});
