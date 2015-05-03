describe('Edit movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyApp');

        FirebaseServiceMock = (function () {
            // Nämä viestit esittävät Firebasessa olevia viestejä
            var nextId = 4;
            var movies = [
                {
                    $id: 1,
                    description: 'kuvaus1',
                    director: 'ohjaaja1',
                    name: 'elokuva1',
                    release: 2001
                },
                {
                    $id: 2,
                    description: 'kuvaus2',
                    director: 'ohjaaja2',
                    name: 'elokuva2',
                    release: 2002
                },
                {
                    $id: 3,
                    description: 'kuvaus3',
                    director: 'ohjaaja3',
                    name: 'elokuva3',
                    release: 2003
                }
            ];

            return {
                addMovie: function (movie) {
                    movie.$id = nextId++;
                    movies.push(movie);
                },
                getMovies: function () {
                    return movies;
                },
                getMovie: function (key, callback) {
//                    setTimeout(function () {
//                        movieToReturn = movies.find(function (m) {
//                            return m.$id = key;
//                        });
//                        callback(movieToReturn);
//                    }, 0);
                    movieToReturn = movies.filter(function (m) {
                        return m.$id === key;
                    })[0];
                    callback(movieToReturn);
                },
                editMovie: function (movie) {
                    movieToEdit = movies.filter(function (m) {
                        return m.$id === movie.$id;
                    })[0];
                    if (movieToEdit) {
                        movieToEdit.name = movie.name;
                        movieToEdit.release = movie.release;
                        movieToEdit.director = movie.director;
                        movieToEdit.description = movie.description;
                    }
                },
                removeMovie: function (movie) {
                    movies = movie.filter(function (m) {
                        return m.$id !== movie.$id;
                    });
                }
            };

        })();

        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

//        RouteParamsMock = (function () {
//            return {
//                // Toteuta mockattu $routeParams-muuttuja tähän
//            }
//        });
        RouteParamsMock = {
            id: 2
        };

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('EditMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        expect(scope.movie.name).toBe('elokuva2');
        expect(scope.movie.director).toBe('ohjaaja2');
        expect(scope.movie.release).toBe(2002);
        expect(scope.movie.description).toBe('kuvaus2');
    });

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        scope.movie.name = "elokuva2_uusi";
        scope.movie.director = "ohjaaja2_uusi";
        scope.movie.release = 2022;
        scope.movie.description = "kuvaus2_uusi";
        scope.saveMovie(scope.movie);
        expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.movie.name = "elokuva2_uusi";
        scope.movie.director = "";
        scope.movie.release = 2022;
        scope.movie.description = "kuvaus2_uusi";
        scope.saveMovie(scope.movie);
        expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();    
    });
});