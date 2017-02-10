app.factory('BookingService', function($resource) {
  return $resource('/api/booking/:id', { id: '@_id' }, {
        update: {
            method: 'PUT' // this method issues a PUT request
        }
  });
});
