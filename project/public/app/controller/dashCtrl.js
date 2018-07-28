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
    
    $scope.exportTableToExcel = function (tableID, filename = ''){
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        
        // Specify file name
        filename = filename?filename+'.xls':'excel_data.xls';
        
        // Create download link element
        downloadLink = document.createElement("a");
        
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
    }
    
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
