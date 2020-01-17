angular.module('appRouter', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "/views/home.html"
    });
  });