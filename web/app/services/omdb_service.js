MyApp.service('OMDBService', function($http){
  this.findMovies = function(params){
    return $http.get('http://www.omdbapi.com', { params: params });
  };
});