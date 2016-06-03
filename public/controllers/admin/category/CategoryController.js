app.controller('CategoryController.list', ['$scope','$config','CategoryService','$state', function($scope, $config, userService,$state) { 
    $scope.add = function(){
        $state.go("category.add");
    }
}]);