var app = angular.module('radar', ['ui.grid', 'ui.grid.edit', 'ui.grid.cellNav']);

app.controller('MainCtrl', [ '$scope', 'dataFactory', function($scope, dataFactory) {
    
    $scope.cellSelectYesNoTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ui-grid-editor ng-model="COL_FIELD" ng-blur="getExternalScopes().updateEntity($event)">'+
                                            '<option value="Yes">Yes</option>'+
                                            '<option value="No">No</option>'+
                                        '</select>';
    
    $scope.cellSelectLMHTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ui-grid-editor ng-model="COL_FIELD" ng-blur="getExternalScopes().updateEntity($event)">'+
                                            '<option value="Low">Low</option>'+
                                            '<option value="Medium">Medium</option>'+
                                            '<option value="High">High</option>'+
                                        '</select>';
    $scope.cellTextareaTemplate = '<textarea ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ui-grid-editor ng-model="COL_FIELD" ng-blur="getExternalScopes().updateEntity($event)" class="text-area-full"></textarea>';
    
    $scope.buttonScope = { 
        updateEntity : function(evt){

        }
    };
    
    $scope.gridOptions = {
        enableFiltering: true,
        enablePinning: false,
        rowHeight: 160,
        enableCellSelection: true,
        enableRowSelection: true,
        enableCellEdit: false,
        columnDefs: [
            { displayName:'FRAMEWORK',      name: 'Framework',      width: '10%' },
            { displayName:'CATEGORY',       name: 'Category',       width: '10%', enableCellEdit: true },
            { displayName:'ADOPTABILITY',   name: 'Adoptability',   width: '10%', enableCellEdit: true , editableCellTemplate: $scope.cellSelectLMHTemplate },
            { displayName:'USAGE',          name: 'Usage',          width: '7%',  enableCellEdit: true },
            { displayName:'FOCUS RADAR',    name: 'Focus_Radar',    width: '11%', enableCellEdit: true },
            { displayName:'LEARNING CURVE', name: 'Learning_Curve', width: '12%', enableCellEdit: true , editableCellTemplate: $scope.cellSelectLMHTemplate },
            { displayName:'DESCRIPTION',    name: 'Description',    width: '14%', enableCellEdit: true  , editableCellTemplate: $scope.cellTextareaTemplate },
            { displayName:'SOC',            name: 'SOC',            width: '5%',  enableCellEdit: true , editableCellTemplate: $scope.cellSelectYesNoTemplate },
            { displayName:'POV',            name: 'POV',            width: '14%', enableCellEdit: true , editableCellTemplate: $scope.cellTextareaTemplate }
        ]
    };
  
     $scope.msg = {};
     $scope.msg.modifications = [];

     $scope.gridOptions.onRegisterApi = function(gridApi){
        gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            if(oldValue === newValue) return;
            $scope.msg.lastCellEdited = {
                                         'row_id' : rowEntity.Id ,
                                         'row_name' : rowEntity.Framework ,
                                         'column_name' : colDef.name ,
                                         'new_value' : newValue ,
                                         'old_value' : oldValue
                                        } ;
            $scope.msg.modifications.push($scope.msg.lastCellEdited);
        });
    };
 
  dataFactory.getData('services/data.json').
    success(function(response) {
      $scope.gridOptions.data = response.data;
      $scope.getPendingModeration();
    });
    $scope.toggleFilter = function(event){
//        event.preventDefault();
        $('.ui-grid-filter-container').toggleClass('filter-off');
        $('#gridFilter').toggleClass('btn-default');
        $('#gridFilter').toggleClass('btn-primary');
        $('.ui-grid-native-scrollbar.vertical').toggleClass('moved');
    };
    $scope.saveLocalModifications = function(evt){
        evt.preventDefault();
        var data = $scope.msg.modifications;
        if(!data ||  data.length === 0){
             $().toastmessage('showWarningToast', 'No changes made to save');
            return;
        }
        dataFactory.sendData('services/',data).
        success(function(response){
            $().toastmessage('showNoticeToast', 'Data Sent for moderation');
            $scope.getPendingModeration();
        }).
        error(function(error){
            $().toastmessage('showErrorToast', 'An error occured while trying to save data');
        });
    };
    $scope.getPendingModeration = function(){
        dataFactory.getData('services/moderationPending.json').
            success(function(response) {
                $scope.moderationData = response; 
            });
    };
}]);

//$( window ).resize(function() {
//  var uiGridHeaderHeight = $( '.ui-grid-header' ).height();
//  var windowHeight =  $( window ).height();
//  var uiGridViewPortHeight = windowHeight - (uiGridHeaderHeight + 100);
//  $('.ui-grid-viewport').height(uiGridViewPortHeight + 'px');
//});