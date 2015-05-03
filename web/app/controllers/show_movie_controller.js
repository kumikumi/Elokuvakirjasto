MyApp.controller('ShowMovieController', function ($scope, $location, $routeParams, FirebaseService) {
    FirebaseService.getMovie($routeParams.id, function(movie) {
        $scope.movie = movie;
    });
});