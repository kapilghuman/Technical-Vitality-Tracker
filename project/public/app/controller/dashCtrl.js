angular.module('dashController', ['addServices'])
.controller('dashCtrl', function(Add , $scope) {
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
})

.controller('editCtrl', function($scope, $routeParams, Add, $timeout, $location){
	var app = this;
	$scope.usernameTab = "active";
	
	Add.getStatus($routeParams.id).then(function(data){
		if(data.data.success){
			$scope.newStatus = data.data.users.status;
			app.currentStatus = data.data.users._id;
		}
		
		else{
			app.errorMsg = data.data.message;
		}
	});
	
	app.usernamePhase = function(){
		$scope.usernameTab = "default";
		$scope.titleTab = "default";
		$scope.statusTab = "active";
		$scope.permissionTab = "default";
	};
	
	app.updateStatus = function(newStatus, valid){
		app.errorMsg = false;
		app.disabled = true;
		var userObject = {};
		
		if(valid){
			userObject._id = app.currentStatus;
			userObject.status = $scope.newStatus;
			Add.editStatus(userObject).then(function(data){
				if(data.data.success){
					app.successMsg = data.data.message;
					$timeout(function(){
						app.nameForm.status.$setPristine();
						app.nameForm.status.$setUntouched();
						
						app.errorMsg = false;
						app.disabled = false;
						
						$location.path('/dash');
					}, 2000);
				}
				
				else{
					app.errorMsg = data.data.message;
					app.disabled = false;
				}
			});
		}
		
		else{
			app.errorMsg = "Please ensure that status is updates correctly";
			app.disabled = false;
		}
	};
	
});
