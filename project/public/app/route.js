angular.module('appRoute', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
	
	$routeProvider.when('/', {
		templateUrl: 'app/views/index.html'
	})
	
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
