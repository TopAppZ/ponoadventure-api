app.controller('AdventureController.list', ['$scope','$config','AdventureService','$state', function($scope, $config, adventureService, $state) {    
    var adventures = adventureService.query(function() {        
        console.log(adventures);
        $scope.adventures = adventures;
    });
    $scope.add = function(){
        $state.go("adventures.add");
    }
}]);
app.controller('AdventureController.add', ['$scope','$config','AdventureService','$state', 'SharedDataService', function($scope, $config, adventureService, $state, sharedDataService) {    
    $scope.categories = sharedDataService.categories;
    $scope.save = function(){
    	$(".form-control").css('border', '1px solid #ccc');
    	$('#place_add_error').hide();
    	console.log($scope.place);
    	$("#progressWrapper").show();
        var place = new adventureService();          
        adventureService.save($scope.place, function(e){
        	console.log(e);
            $("#progressWrapper").hide();
            $state.go("adventures.list");
            
        }, function(err){
        	console.log(err);
        	$scope.errors = [];
        	$("#progressWrapper").hide();
        	for (var prop in err.data.errors) {
			    console.log(prop + " is " + err.data.errors[prop].message);
			    $scope.errors.push(err.data.errors[prop].message);
			    $('#'+ prop).css('border', '1px solid red');
			}
			$('#place_add_error').show();
			window.scrollTo(0, 0);
        })
    }
}]);