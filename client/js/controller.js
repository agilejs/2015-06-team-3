(function() {
    'use strict';

    var app = angular.module('MovieDatabase');

    app.controller('AppController', function($scope, $location) {
        $scope.title = 'The Movie Database';
        $scope.getClass = function(path) {
            if ($location.path().substr(0, path.length) === path ||
              (path === 'home' && $location.path().length === 1)) {
                return 'active';
            } else {
                return '';
            }
        };
    });

    app.controller('WelcomeController', function() {
    });

    app.controller('MoviesListController',
        function($scope, $location, movieList) {
        $scope.movies = movieList.data;
        $scope.predicate = 'title';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
        $scope.add = function () {
            $location.path('/movies/new');
        };
    });

    app.controller('MoviesAddController',
        function($scope, $http, $location) {
        $scope.movie = {};
        $scope.save = function (movie) {
            $http.post('/movies', movie)
            .success(function(res) {
                $location.path('/movies/' + res.id);
            });
        };
    });

    app.controller('MovieDetailController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.delete = function () {
            $http.delete('/movies/' + $scope.movie.id).success(function (res) {
                $location.path('/movies');
            });
        };
    });

    app.controller('MovieEditController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.save = function () {
            $http.put('/movies/' + $scope.movie.id, $scope.movie)
            .success(function (res) {
                $location.path('/movies/' + $scope.movie.id);
            });
        };
    });

    function ProblemController($scope, $location) {
        $scope.culprit = $location.search().culprit || 'unknown beast';
    }

    app.controller('NotFoundController', ProblemController);
    app.controller('ErrorController', ProblemController);
})();
