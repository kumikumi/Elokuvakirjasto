MyApp.controller('MovieController', function ($scope, FirebaseService, OMDBService) {
    $scope.movies = FirebaseService.getMovies();
    
    $scope.searchOMDB = function() {
        OMDBService.findMovies($scope.searchParams).success(function(movies){
            $scope.omdbMovies = movies.Search || [];
        });
    };
    
    $scope.removeMovie = function(movie) {
        FirebaseService.removeMovie(movie);
    };
});