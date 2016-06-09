app.factory('AdventureService', function($resource) {
  return $resource('/api/adventure/:id', { id: '@_id' }, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }
  }); 
});