angular.module('userApp', ['appRoutes', 'userController', 'userServices', 'mainController', 'authServices'])

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
});


