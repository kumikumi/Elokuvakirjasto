describe('Show movie', function () {
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

        RouteParamsMock = {
            id: 2
        };

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('ShowMovieController', {
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
     * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
     * käyttämällä toBeCalled-oletusta.
     */
    it('should show current movie from Firebase', function () {
        expect(scope.movie.name).toBe('elokuva2');
        expect(scope.movie.director).toBe('ohjaaja2');
        expect(scope.movie.release).toBe(2002);
        expect(scope.movie.description).toBe('kuvaus2');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });
});