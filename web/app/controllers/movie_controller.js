MyApp.controller('MovieController', function ($scope, FirebaseService, currentAuth, $location, OMDBService) {
    $scope.movies = FirebaseService.getMovies();
    
    $scope.searchOMDB = function() {
        OMDBService.findMovies($scope.searchParams).success(function(movies){
            $scope.omdbMovies = movies.Search || [];
        });
    };
    
    $scope.removeMovie = function(movie) {
        if(!currentAuth) {
            $location.path('/login');
            return;
        }
        FirebaseService.removeMovie(movie);
    };
});