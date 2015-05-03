MyApp.controller('AddMovieController', function ($scope, FirebaseService, currentAuth, $location) {
    $scope.addMovie = function (movie) {
        if(!currentAuth) {
            $location.path('/login');
            return;
        }
        if (!movie.name || !movie.director || !movie.release || !movie.description) {
            return;
        }
        FirebaseService.addMovie(movie);
        $location.path('/');
    };
});