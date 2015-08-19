/**
 * Created by bugounet on 16/05/15.
 *
 * This file handles lobby application routing.
 */

lobbyApp.config(['$routeProvider', function ($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: '/lobby/templates/home',
            controller: 'homeCtrl'
        }).
        when('/scores', {
            templateUrl: '/lobby/templates/scores',
            controller: 'scoresController'
        }).
        when('/store', {
            templateUrl: '/lobby/templates/store',
            controller: 'storeController'
        }).
        when('/preferences', {
            templateUrl: '/lobby/templates/preferences',
            controller: 'preferencesController'
        }).
        when('/game', {
            templateUrl: '/lobby/templates/game',
            controller: 'gameController'
        }).otherwise({
            redirectTo: '/'
        });
}]);
