app.directive("filedrop",function () {
	return {
		restrict: 'A',

		link: function(scope, element, attrs) {
        	element.on('dragenter', function (e) 
			{
			    e.stopPropagation();
			    e.preventDefault();
			    element.css('border', '2px solid #0B85A1');
			});
			element.on('dragover', function (e) 
			{
			     e.stopPropagation();
			     e.preventDefault();
			});
			element.on('drop', function (e) {
				e.preventDefault();
				var dropzone = $(this);
				var files = e.originalEvent.dataTransfer.files;
				
			    var reader = new FileReader();		
			    reader.onload = (function(theFile) {
        			return function(e) {			       		
			       		dropzone.attr('src', e.target.result);
			       		dropzone.attr('changed', 1);
        			};
      			})(files[0]);

		      // Read in the image file as a data URL.
		      reader.readAsDataURL(files[0]);
    	     
			});
      	}
    }
})