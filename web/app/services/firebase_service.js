MyApp.service('FirebaseService', function ($firebase) {
    // Keskustele Firebasen kanssa tämän palvelun avulla
    var firebaseRef = new Firebase('https://dazzling-fire-4946.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovie = function (key, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(key));
        });
    };

    this.getMovies = function () {
        return movies;
    };

    this.addMovie = function (movie) {
        movies.$add(movie);
    };

    this.editMovie = function (movie) {
        movies.$save(movie);
    };
    
    this.removeMovie = function (movie) {
        movies.$remove(movie);
    };

});