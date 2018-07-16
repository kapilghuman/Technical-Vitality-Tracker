angular.module('userApp', ['appRoutes', 'userController', 'userServices', 'mainController', 'authServices', 'addController', 'addServices'])

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});

