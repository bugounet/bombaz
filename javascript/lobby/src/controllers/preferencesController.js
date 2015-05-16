/**
 * Created by bugounet on 16/05/15.
 *
 * Controller for preferences page.
 */

lobbyControllers.controller('preferencesController', ['$scope', 'popupService',
    function ($scope, $popupService) {
        "use strict";
        $scope.me = {
            name: "Bugounet",
            email: "sullivan.matas@example.com",
        };
        $scope.sound = {
            volume: 75,
            music: false,
            effects: true,
        };
    }]);
