angular.module('dashController', ['addServices'])
.controller('dashCtrl', function(Add) {
    var app = this;
    app.errorMsg=false;
    
    Add.getAccomplishments().then(function(data) {
        if(data.data.success){
            app.accomplishments = data.data.accomplishments;
        }
        else{
            app.errorMsg=data.data.message;
        }
    });
});