app.controller('AdventureController.list', ['$scope','$config','AdventureService','$state', function($scope, $config, adventureService, $state) {    
    var adventures = adventureService.query(function() {        
        console.log(adventures);
        $scope.adventures = adventures;
    });
    $scope.add = function(){
        $state.go("adventures.add");
    }
}]);
app.controller('AdventureController.add', ['$scope','$config','AdventureService','$state', function($scope, $config, adventureService, $state) {    
    
}]);