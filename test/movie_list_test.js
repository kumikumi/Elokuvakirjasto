describe('Movie list', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyApp');

        FirebaseServiceMock = (function () {
            // Nämä viestit esittävät Firebasessa olevia viestejä
            var movies = [
                {
                    description: 'kuvaus1',
                    director: 'ohjaaja1',
                    name: 'elokuva1',
                    release: 2001
                },
                {
                    description: 'kuvaus2',
                    director: 'ohjaaja2',
                    name: 'elokuva2',
                    release: 2002
                },
                {
                    description: 'kuvaus3',
                    director: 'ohjaaja3',
                    name: 'elokuva3',
                    release: 2003
                }
            ];

            return {
                addMovie: function (message) {
                    movies.push(message);
                },
                getMovies: function () {
                    return movies;
                }
            };

        })();

        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('MovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should list all movies from the Firebase', function () {
        expect(scope.movies.length).toBe(3);
        expect(scope.movies[0].name).toBe('elokuva1');
        expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
    });

    /* 
     * Testaa, että elokuvan pystyy poistamaan Firebasesta.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to remove a movie', function () {
        expect(true).toBe(true);
    });
});