angular.module('dashController', ['addServices'])
.controller('dashCtrl', function(Add) {
    var app = this;
    app.errorMsg=false;
    
    function getAccomplishments() {
        Add.getAccomplishments().then(function(data) {
            if(data.data.success){
                app.accomplishments = data.data.accomplishments;
            }
            else{
                app.errorMsg=data.data.message;
            }
        });
    }
    
    getAccomplishments();
    
    app.deleteAccomplishment = function(title) {
        Add.deleteAccomplishment(title).then(function(data) {
            if(data.data.success){
                getAccomplishments();
            } else{
                app.errorMsg=data.data.message;
            }
        });
    }
});
