var app = angular.module('myApp', ['appRoute','userController']);
  
    app.controller('validateCtrl', function($scope) {
    $scope.email = 'abc@exmaple.com';
    $scope.pass= 'wyzuvw';
});
