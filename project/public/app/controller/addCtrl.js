var app = angular.module('addController', ['addServices']);

app.controller('addCtrl', function($http, $location, $timeout, Add){
	
	var app = this;
	
	this.addAcc = function(addData){
		app.loading = true;
		app.errorMsg = false;
		
		Add.create(app.addData).then(function(data){
			
			if(data.data.success){
				app.loading = false;
				
				//Create Success Message
				app.successMsg = data.data.message;
				
				//Redirect to dash Page
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

