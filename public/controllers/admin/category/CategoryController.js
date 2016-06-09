app.controller('CategoryController.list', ['$scope','$config','CategoryService','$state', function($scope, $config, categryService,$state) {
    $scope.categories = categryService.query(function() {        
        console.log($scope.categories);        
    });
    $scope.add = function(){
        $state.go("category.add");
    }  
    
    $scope.deleteCategory = function(category){
        category.$delete(function(){
            $scope.categories = categryService.query(function() {        
                console.log($scope.categories);        
            });
        });
    }
    
}]);
app.controller('CategoryController.add', ['$scope','$config','CategoryService','$state', function($scope, $config, categryService,$state) {
    $scope.save = function(){
        var category = new categryService();  
        category.name = $scope.cat.name;
        category.image = $scope.cat.image;
        category.$save(category, function(e){
            $state.go("category.list");
        })        
    }
    
}]);