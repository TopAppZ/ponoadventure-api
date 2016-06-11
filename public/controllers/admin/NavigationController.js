app.controller('NavigationController',['$scope','SharedDataService','CategoryService',function($scope, sharedDataService, categoryService){      
    $scope.$watch(function () { return sharedDataService.categories }, function (newVal, oldVal) {        
        $scope.categories = sharedDataService.categories;
    });
}]);