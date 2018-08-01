angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location , $rootScope){
    var app=this;
    app.loadme=false;

    $rootScope.$on('$routeChangeStart',function()
    {
        if(Auth.isLoggedIn()){
            console.log('User is logged in');
            Auth.getUser().then(function(data){
                console.log(data);
                
                // to check user is logged in or not !!
                app.isLoggedIn = true;
		 
		// check role for diplaying Top performer button
                if(data.data.role == "SPOC/Manager" || data.data.role == "Tech_Council_Member"){
                    app.trueRole = true;
                }
                else{
                    app.trueRole = false;
                }

                // assigning data to variables (DATABASE)
                app.username = data.data.username;
                app.role = data.data.role;
                app.userId = data.data.userId;

                //for loading full page in single instance 
                app.loadme = true;
            });
        }
        else{
            console.log("user is not logged in");
            app.isLoggedIn = false;
            app.username='';
            app.role='';
            //for loading full page in single instance 
            app.loadme = true;
        }
    });

	
	this.doLogIn = function(loginData){
		app.loading = true;
		app.errorMsg = false;
		
		Auth.login(app.loginData).then(function(data){
			
			if(data.data.success){
				app.loading = false;
				
				//Create Success Message
				app.successMsg = data.data.message+"....Redirecting";
				
				//Redirect to Register Page
				$timeout(function(){
					$location.path('/dash'); 
					
					app.successMsg = false;
				}, 2000);
			}
			
			else{
				app.loading = false;
				//Create an Error Message
				app.errorMsg = data.data.message;
			}
		});
	};

    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/login');
        },2000);
    };

});


