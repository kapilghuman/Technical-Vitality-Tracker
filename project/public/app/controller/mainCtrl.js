angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location){
	var app = this;
	
	this.doLogIn = function(loginData){
		app.loading = true;
		app.errorMsg = false;
		
		Auth.login(app.loginData).then(function(data){
			
			if(data.data.success){
				app.loading = false;
				
				//Create Success Message
				app.successMsg = data.data.message;
				
				//Redirect to Register Page
				$timeout(function(){
					$location.path('/dash');
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


