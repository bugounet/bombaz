var lobbyApp = angular.module('lobbyApp', [
    'ngRoute',
    'lobbyControllers',
]);

lobbyApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('%%');
    $interpolateProvider.endSymbol('%%');
});

lobbyApp.config(["popupServiceProvider", function(popupServiceProvider) {
  popupServiceProvider.popupDefaultDisplayDuration(2);
}]);

var lobbyControllers = angular.module('lobbyControllers', []);


