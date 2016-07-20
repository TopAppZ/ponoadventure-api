app.directive('schedule', ['$compile',function ($compile) {
    return {
        restrict: 'AE',
        scope:{
        	value: '=',
        	onDelete: '&'
        },
        replace:true,
        templateUrl: '/directives/templates/schedule.tpl.html',
        link: function (scope, el, attrs) {        	        	            
        	scope.removeSchedule = function(){   
        		console.log(scope.value);     		
        		scope.onDelete();
        		//el.remove();
        	}
            scope.$watch('value', function(newValue, oldValue) {                            
                if (newValue) {
                    console.log(newValue);                                        
                    if(scope.value.type == 'repeat'){
                        var htmlURL = "/directives/templates/repeatative_days.tpl.html";
                        var elem = $compile("<div ng-include src=\"\'" + htmlURL +"\'\"></div>")(scope);
                        el.find('#dateTemplate').html(elem);                        
                    } else if(scope.value.type == 'date'){
                        var htmlURL = "/directives/templates/multiple_date.tpl.html";
                        var elem = $compile("<div ng-include src=\"\'" + htmlURL +"\'\"></div>")(scope);
                        el.find('#dateTemplate').html(elem);                        
                    }                    
                    
                }

            });
            scope.loadDateTemplate = function(){                                                                      
                if(scope.value.type == 'repeat'){
                    var htmlURL = "/directives/templates/repeatative_days.tpl.html";
                    var elem = $compile("<div ng-include src=\"\'" + htmlURL +"\'\"></div>")(scope);
                    el.find('#dateTemplate').html(elem);                        
                } else if(scope.value.type == 'date'){
                    var htmlURL = "/directives/templates/multiple_date.tpl.html";
                    var elem = $compile("<div ng-include src=\"\'" + htmlURL +"\'\"></div>")(scope);
                    el.find('#dateTemplate').html(elem);                        

                }
                
            }
        }
    };
}]);