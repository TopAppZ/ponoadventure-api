app = angular.module("app", ['ui.router','ngResource']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    //$urlRouterProvider.otherwise("/admin/home");    
    $stateProvider
        .state('home', {
          url: "/admin/home",
          templateUrl: "views/admin/home.tpl.html"
        })
        .state('users', {
          url:"/admin/user",
          abstract: true,          
          templateUrl: "views/admin/users.tpl.html",          
        })
        .state('users.edit', {
          url: "/edit/:id",
          templateUrl: "views/admin/user.edit.tpl.html", 
          controller: "User.EditController"          
        })
        .state('users.list', {
          url: "/list",
          templateUrl: "views/admin/user.list.tpl.html", 
          controller: "User.ListController"          
        })
        .state('adventures', {
          url: "/admin/adventures",
          templateUrl: "views/admin/adventures.tpl.html"
        })
        .state('fuel', {
          url: "/admin/fuel",
          templateUrl: "views/admin/fuel.tpl.html"
        })
        .state('resto', {
          url: "/admin/resto",
          templateUrl: "views/admin/resto.tpl.html"
        })
});
var config = {
    api_url: 'http://localhost:3000/api/'
}
app.constant('$config',config);
app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
