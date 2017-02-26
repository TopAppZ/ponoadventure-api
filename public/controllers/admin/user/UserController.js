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
app.controller('User.Booking', ['$scope','$config','UserService','$state', 'BookingService', function($scope, $config, userService,$state, bookingService) {
    var allBookings  = bookingService.query(function(){
      $scope.bookings = allBookings;
    })
    $scope.bookingDetails = function(id){
        $state.go('users.booking.details',{id: id});
    }
}]);

app.controller('User.Booking.Details', ['$scope','$config','UserService','$state', 'BookingService', function($scope, $config, userService,$state, bookingService) {
    var booking = bookingService.get({id:$state.params.id},function(){
      console.log(booking);
      $scope.booking = booking;
    })
}]);
