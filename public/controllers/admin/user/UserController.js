app.controller('User.ListController', ['$scope','$config','UserService','$state', function($scope, $config, userService,$state) {    
    var users = userService.query(function() {        
        console.log(users);
        $scope.users = users;
    });
    $scope.editUser = function(id){        
        $state.go('users.edit',{id: id});
    }
}]);
app.controller('User.EditController', ['$scope','$config','UserService','$state', function($scope, $config, userService,$state) {
    var user = userService.get({id:$state.params.id},function() {
        console.log(user);
        $scope.user = user;
    });
    $scope.update = function() {               
        $scope.user.$update(function() {                                    
            console.log(user);
            $scope.user = user;
        }, function(err){
            console.log(err);
            $scope.isError = true;
            $scope.err_msg = err.data.error.message;
        });
    }
}]);