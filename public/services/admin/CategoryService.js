app.factory('CategoryService', function($resource) {
  return $resource('/api/category/:id', { id: '@_id' }, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }        
  }); 
});