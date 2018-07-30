angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	});
	
	$routeProvider.when('/login', {
		templateUrl: 'app/views/pages/users/login.html'
	});
	
	$routeProvider.when('/dash', {
		templateUrl: 'app/views/pages/users/dash.html',
		controller: 'dashCtrl',
        	controllerAs: 'dash'
	});
	
	$routeProvider.when('/edit/:id', {
		templateUrl: 'app/views/pages/users/edit.html',
		controller: 'editCtrl',
                controllerAs: 'edit'
	});
	
	$routeProvider.when('/AddAccomplishments', {
		templateUrl: 'app/views/pages/users/aa.html',
		controller: 'addCtrl',
		controllerAs: 'add'
	});
	
	$routeProvider.when('/logout', {
		templateUrl: 'app/views/pages/users/logout.html'
	});
	
	$routeProvider.when('/profile',{
            templateUrl:'app/views/pages/users/profile.html'
    	});
	
	$routeProvider.when('/top', {
		templateUrl: 'app/views/pages/users/top.html',
		controller: 'topCtrl',
			controllerAs: 'top'
	});
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
