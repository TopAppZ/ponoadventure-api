app.factory('UserService', function($resource) {
  return $resource('/api/user/:id', { id: '@_id' }, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }
  }); 
});