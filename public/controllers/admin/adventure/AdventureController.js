app.controller('AdventureController.list', ['$scope','$config','AdventureService','$state', function($scope, $config, adventureService, $state) {    
    var query = {};
    query[$state.params.filter] = $state.params.value;
    query['loc'] = $state.params.loc;
    var adventures = adventureService.query(query, function() {        
        console.log(adventures);
        $scope.adventures = adventures;
    });
    $scope.add = function(){
        $state.go("adventures.add");
    }
    $scope.editPlace = function(place){
        $state.go("adventures.edit", {"id": place._id});
    }
}]);
app.controller('AdventureController.add', ['$scope','$config','AdventureService','$state', 'SharedDataService', function($scope, $config, adventureService, $state, sharedDataService) {    
    $scope.categories = sharedDataService.categories;
    $scope.place = {
        location: {
            coordinates:[0.0,0.0]
        }
    }
    $scope.save = function(){        
    	$(".form-control").css('border', '1px solid #ccc');
    	$('#place_add_error').hide();
    	$("#progressWrapper").show();
        var place = new adventureService(); 
        if(($("#place_image_container").attr("src")) != '' && typeof($scope.place) != 'undefined'){
            $scope.place.img = $("#place_image_container").attr("src");
        }         
        adventureService.save($scope.place, function(e){
            $("#progressWrapper").hide();
        	console.log(e);            
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

app.controller('AdventureController.edit', ['$scope','$config','AdventureService','$state', 'SharedDataService', function($scope, $config, adventureService, $state, sharedDataService) {  
    $scope.categories = sharedDataService.categories;
    var adventure = adventureService.get({id:$state.params.id}, function() {        
        console.log(adventure);
        $scope.place = adventure;
    });
    $scope.update = function(){         
        $(".form-control").css('border', '1px solid #ccc');
        $('#place_add_error').hide();        
        $("#progressWrapper").show();      
        var isFileChanged = $("#place_image_container").attr("changed");
        if(isFileChanged == "1"){
            $scope.place.imgChanged = 1;
            if(($("#place_image_container").attr("src")) != '' && typeof($scope.place) != 'undefined'){                
                $scope.place.img = $("#place_image_container").attr("src");
            } 
            $scope.place.$update(function(){
                console.log("Updated");
                $("#place_image_container").attr("changed", 0);
                $("#progressWrapper").hide();
                console.log($scope.place);            
            }, function(err){
                console.log(err);
                $scope.errors = [];
                $("#progressWrapper").hide();
                for (var prop in err.data.error.errors) {
                    console.log(prop + " is " + err.data.error.errors[prop].message);
                    $scope.errors.push(err.data.error.errors[prop].message);
                    $('#'+ prop).css('border', '1px solid red');
                }
                $('#place_add_error').show();
                window.scrollTo(0, 0);
            })
        } else {
            $scope.place.imgChanged = 0;
            $scope.place.$update(function(){
                console.log("Updated");
                $("#place_image_container").attr("changed", 0);
                $("#progressWrapper").hide();
                console.log($scope.place);            
            }, function(err){
                console.log(err);                
                $scope.errors = [];
                $("#progressWrapper").hide();

                for (var prop in err.data.error.errors) {
                    console.log(prop + " is " + err.data.error.errors[prop].message);
                    $scope.errors.push(err.data.error.errors[prop].message);
                    $('#'+ prop).css('border', '1px solid red');
                }
                $('#place_add_error').show();
                window.scrollTo(0, 0);
            })
        }
    }
}]);  
