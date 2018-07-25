angular.module('userApp', ['appRoutes', 'userController', 'userServices', 'mainController', 'authServices', 'addController', 'addServices', 'dashController'])

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});

