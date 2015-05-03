MyApp.controller('AddMovieController', function ($scope, FirebaseService, $location) {
    $scope.addMovie = function (movie) {
        if (!movie.name || !movie.director || !movie.release || !movie.description) {
            return;
        }
        FirebaseService.addMovie(movie);
        $location.path('/');
    };
});