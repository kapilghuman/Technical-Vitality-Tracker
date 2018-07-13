var app = angular.module('userController', ['userServices']);

app.controller('regCtrl', function($http, $location, $timeout, User){
	
	var app = this;
	
	this.regUser = function(regData){
		app.loading = true;
		app.errorMsg = false;
		
		User.create(app.regData).then(function(data){
			
			if(data.data.success){
				app.loading = false;
				
				//Create Success Message
				app.successMsg = data.data.message;
				
				//Redirect to Register Page
				$timeout(function(){
					$location.path('/login');
				}, 2000);
			}
			
			else{
				app.loading = false;
				//Create an Error Message
				app.errorMsg = data.data.message;
			}
		});
	};
});

