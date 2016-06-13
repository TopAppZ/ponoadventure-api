app.controller('NavigationController',['$scope','SharedDataService','CategoryService',function($scope, sharedDataService, categoryService){      
	var categories = categoryService.query(function() {       
        $scope.categories = categories;
        sharedDataService.categories = categories;        
        $("#progressWrapper").hide();
    });
    $scope.$watch(function () { return sharedDataService.categories }, function (newVal, oldVal) {        
        $scope.categories = sharedDataService.categories;
    });
}]);