var app = angular.module('radarMod', ['ui.grid', 'ui.grid.cellNav']);
 
app.controller('ModCtrl', [ '$scope', 'dataFactory', function($scope, dataFactory) {
    
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
            { displayName: 'Status',        name:'status'}
        ]
    };
    
  dataFactory.getData('services/moderatedDataLog.json').
    success(function(response) {
      $scope.gridOptions.data = response;
    });
}]);