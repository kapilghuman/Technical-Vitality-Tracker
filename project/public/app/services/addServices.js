angular.module('addServices', [])

.factory('Add', function($http){
	addFactory = {};
	
	addFactory.create = function(addData){
		return $http.post('/api/adds', addData);
	}
	
	addFactory.getAccomplishments = function() {
      		return $http.get('/api/accomplishment/');  
    	};
	
	addFactory.deleteAccomplishment = function(title) {
        	return $http.delete('/api/accomplishment/' + title);
    	};
	
	addFactory.getPerformer = function(dates) {
		return $http.post('/api/performer/',dates);  
  	};
	
	return addFactory;
});
