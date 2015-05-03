var MyApp = angular.module('MyApp', ['ngRoute', 'firebase']);

MyApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }]);

MyApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'MovieController',
                templateUrl: 'app/views/movielist.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies', {
                controller: 'MovieController',
                templateUrl: 'app/views/movielist.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id', {
                controller: 'ShowMovieController',
                templateUrl: 'app/views/show_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/edit_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/new', {
                controller: 'AddMovieController',
                templateUrl: 'app/views/add_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/login', {
                controller: 'UserController',
                templateUrl: 'app/views/login.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
});

MyApp.run(function (AuthenticationService, $rootScope, $location) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
        $location.path('/login');
    };

    $rootScope.getUserLoggedIn = function() {
        return AuthenticationService.getUserLoggedIn();
    };
});