var lobbyApp = angular.module('lobbyApp', []);

lobbyApp.config(function($interpolateProvider) {
$interpolateProvider.startSymbol('%%');
$interpolateProvider.endSymbol('%%');
});
