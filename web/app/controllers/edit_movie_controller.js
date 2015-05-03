MyApp.controller('EditMovieController', function ($scope, $location, $routeParams, currentAuth, FirebaseService) {
    FirebaseService.getMovie($routeParams.id, function (movie) {
        $scope.movie = movie;
    });

    $scope.saveMovie = function (movie) {
        if(!currentAuth) {
            $location.path('/login');
            return;
        }
        if (!movie.name || !movie.director || !movie.release || !movie.description) {
            return;
        }
        FirebaseService.editMovie(movie);
        $location.path('/movies/'+movie.$id);
    };
});
