describe('Add movie', function () {
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

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('AddMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {
        var movie1 = {
            name: "uusi elokuva",
            director: "erkki",
            release: 1901,
            description: "hieno"
        };
        scope.addMovie(movie1);
        expect(FirebaseServiceMock.getMovies().length).toBe(4);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        var movie1 = {
            name: "mahdoton elokuva",
            director: "",
            release: 1901,
            description: "hohoo"
        };
        scope.addMovie(movie1);
        expect(FirebaseServiceMock.getMovies().length).toBe(3);
        expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
    });
});