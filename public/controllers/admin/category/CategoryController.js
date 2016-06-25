app.controller('CategoryController.list', ['$scope','$config','CategoryService','$state','SharedDataService', function($scope, $config, categryService,$state, sharedDataService) {    
    $("#progressWrapper").show();    
    var categories = categryService.query(function() {
        console.log(categories);       
        $scope.categories = categories;
        sharedDataService.categories = categories;        
        $("#progressWrapper").hide();
    });
    $scope.add = function(){
        $state.go("category.add");
    }  
    
    $scope.deleteCategory = function(category){
        category.$delete(function(){
            $scope.categories = categryService.query(function() {        
                console.log($scope.categories); 
                sharedDataService.categories = $scope.categories;
            });
        });
    }
    
}]);
app.controller('CategoryController.add', ['$scope','$config','CategoryService','$state', function($scope, $config, categryService,$state) {
    $scope.save = function(){
        $("#progressWrapper").show();
        var category = new categryService();  
        category.name = $scope.cat.name;
        category.image = $scope.cat.image;
        category.$save({}, function(e){
            $("#progressWrapper").hide();
            $state.go("category.list");
            console.log(e);
        })        
    }    
}]);