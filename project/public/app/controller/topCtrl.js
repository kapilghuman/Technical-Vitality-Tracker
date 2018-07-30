angular.module('topController', ['addServices'])
.controller('topCtrl', function(Add,$scope) {
    var app = this;
    app.errorMsg=false;

    this.getDates = function(dates){

        Add.getPerformer(app.dates).then(function(data){
        
            if(data.data.success){
                app.accomplishments = data.data.accomplishments;
            }
            
            else{
                app.errorMsg = data.data.message;
            }

    });
}
});
    
