/**
 * Created by bugounet on 16/05/15.
 *
 * Controller for home page (i.e. index of lobby app)
 *
 */
var j = 0;
lobbyControllers.controller('homeCtrl', ['$scope', '$http', 'popupService',
    function ($scope, $http, popupService) {
        "use strict";

        $scope.useMatchMaking = function () {
            console.log("match making!");
        };

        $scope.useCustomGame = function() {
            console.log("custom game!");
        };

        $scope.matchMakerAccept = function () {
            console.log("user accepts proposed game");
        };

        $scope.matchMakerDecline = function () {
            console.log("user declines game proposal");
        };

        $scope.matchMakerTimeout = function () {
            // user decline game because of inactivity
            $scope.matchMakerDecline();
        };

        $scope.createGame = function () {
            console.log("Create game!");
        };

        $scope.joinGame = function () {
            console.log("Join game!");
        };

        $scope.customGameStart = function () {
            console.log("Start the game (We'll disappear from games list)");
        };

        $scope.customGameDelete = function () {
            console.log("Delete game and kick all gamers out of here.");
        };

        $scope.customGameKickGamer = function (gamerId) {
            console.log("Kicking ", gamerId, " out of the room.");
        };

        $scope.customGameSay = function () {
            var msg = $scope.customGameMessageBox;
            console.log("Player says : ", msg);
            $scope.customGameMessageBox = "";
        };

        $scope.customGameLeave = function () {
            console.log("Player leaves the room");
        };
}]);

