app = angular.module("app", ['ui.router','ngResource', 'chieffancypants.loadingBar','ui.bootstrap','multipleDatePicker','checklist-model']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/admin/home");    
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
          abstract: true,  
          url: "/admin/adventure",
          templateUrl: "views/admin/adventures.tpl.html"
        })
         .state('adventures.list', {
          url: "/list?filter&value&loc",
          templateUrl: "views/admin/adventure.list.tpl.html",
          controller: "AdventureController.list"
          
        })
         .state('adventures.edit', {
          url: "/edit/:id",
          templateUrl: "views/admin/adventure.edit.tpl.html",
          controller: "AdventureController.edit"
        })
        .state('adventures.add', {
          url: "/add",
          templateUrl: "views/admin/adventure.add.tpl.html",
          controller: "AdventureController.add"
        })  
        .state('category', {
          abstract: true,  
          url: "/admin/category",
          templateUrl: "views/admin/category.tpl.html"
        })
         .state('category.list', {
          url: "/list",
          templateUrl: "views/admin/category.list.tpl.html",
          controller:"CategoryController.list"          
        })
         .state('category.edit', {
          url: "/edit/:id",
          templateUrl: "views/admin/category.edit.tpl.html",          
        })
        .state('category.add', {
          url: "/add",
          templateUrl: "views/admin/category.add.tpl.html",     
          controller:"CategoryController.add"
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
