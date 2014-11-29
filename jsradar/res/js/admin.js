var app = angular.module('radarAdmin', ['ui.grid', 'ui.grid.edit', 'ui.grid.cellNav']);
 
app.controller('AdminCtrl', [ '$scope', 'dataFactory', function($scope, dataFactory) {
    
  $scope.buttons = '<button id="approveBtn" type="button" class="btn btn-primary" ng-click="    getExternalScopes().approve(row)" >Approve</button>' + '<button id="denyBtn" type="button" class="btn btn-primary" ng-click="getExternalScopes().deny(row)" >Deny</button>';
    
    $scope.buttonScope = { 
        approve : function approve(row){
            var i;
            for(i=0; i<$scope.gridOptions.data.length;i++){
                if($scope.gridOptions.data[i].row_id === row.entity.row_id && $scope.gridOptions.data[i].column_name === row.entity.column_name ){
                    dataFactory.getData('services/data.json').
                        success(function(response) {
                            var j,
                                mainJsonData = response.data;
                            for(j=0;j<mainJsonData.length;j++){
                                if(mainJsonData[j].Id === row.entity.row_id){
                                    mainJsonData[j][row.entity.column_name] = row.entity.new_value;
                                }
                            }
                        dataFactory.sendData('services/approved.php',response).
                            success(function(res) {
                                console.log('success 1');
                            });
                        });
                    $scope.gridOptions.data[i].status = 'approved';
                    dataFactory.sendData('services/admin.php',$scope.gridOptions.data[i]).
                        success(function(response) {
                            console.log('success 2');
                        });
                    $scope.gridOptions.data.splice(i,1);
                    dataFactory.sendData('services/moderationPending.php',$scope.gridOptions.data).
                        success(function(response) {
                            console.log('success 3');
                        });
                }
            }
        },
        deny : function deny(row){
                        var i;
            console.log(row.entity);
            for(i=0; i<$scope.gridOptions.data.length;i++){
                if($scope.gridOptions.data[i].row_id === row.entity.row_id && $scope.gridOptions.data[i].column_name === row.entity.column_name ){
                    $scope.gridOptions.data[i].status = 'denied';
                    dataFactory.sendData('services/admin.php',$scope.gridOptions.data[i]).
                        success(function(response) {
                            console.log('success 1');
                        });
                    $scope.gridOptions.data.splice(i,1);
                    dataFactory.sendData('services/moderationPending.php',$scope.gridOptions.data).
                        success(function(response) {
                            console.log('success 2');
                        });
                }
            }
        }
    };
    
    $scope.gridOptions = {
        enableFiltering: false,
        enablePinning: false,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: false,
        columnDefs: [
            { displayName:'Row Name',       name: 'row_name'},
            { displayName:'Column Name',    name: 'column_name'},
            { displayName:'Old Value',      name: 'old_value'},
            { displayName:'New Value',      name: 'new_value'},
            { displayName: 'Action',        name:'action', cellTemplate:$scope.buttons}
        ]
    };
    
  dataFactory.getData('services/moderationPending.json').
    success(function(response) {
      $scope.gridOptions.data = response;
    });
}]);