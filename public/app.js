app = angular.module("app", ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/admin/home");    
    $stateProvider
        .state('home', {
          url: "/admin/home",
          templateUrl: "views/admin/home.html"
        })
        .state('users', {
          url: "/admin/users",
          templateUrl: "views/admin/users.html"
        })
        .state('adventures', {
          url: "/admin/adventures",
          templateUrl: "views/admin/adventures.html"
        })
        .state('fuel', {
          url: "/admin/fuel",
          templateUrl: "views/admin/fuel.html"
        })
        .state('resto', {
          url: "/admin/resto",
          templateUrl: "views/admin/resto.html"
        })
});
