var lobbyApp = angular.module('lobbyApp', []);

lobbyApp.config(function($interpolateProvider) {
$interpolateProvider.startSymbol('%%');
$interpolateProvider.endSymbol('%%');
});
;

lobbyApp.controller('navCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };
}]);

;lobbyApp
// Register the 'lobbyScoresTable' directive factory method.
// We inject $timeout and dateFilter service since the factory method is DI.
.directive('lobbyScoresTable', function($timeout, $http) {
    // return the directive link function. (compile function not needed)
    return function(scope, element, attrs) {
        var scores,  // list of scores
        timeoutId,  // timeoutId, so that we can cancel the time updates
        // used to update the UI
        user_id=0;  // user_id to request user's own scores
        function updateTime() {
            // fetch scores on the rest API
            $http.get('/lobby/api/1.0/scores/'+user_id).success(
                // onn success generate a list of scores
                function(data, status, headers, config) {
                var i=0;
                var format = '<li class="score">%d</li>\n';
                var output_html = '';
                for(i=0; i<data.list.length; i++){
                    output_html += format.replace('%d',data.list[i]);
                }
                element.html(output_html);
            }).error(function(data, status, header, config){
            element.text('Could\'nt get scores');
            });
        }
        // watch the expression, and update the UI on change.
        scope.$watch(attrs.myCurrentTime, function(value) {
            format = value;
            updateTime();
        });
        // schedule update in one second
        function updateLater() {
            // save the timeoutId for canceling
            timeoutId = $timeout(function() {
                updateTime(); // update DOM
                updateLater(); // schedule another update
            }, 1000);
        }

        // listen on DOM destroy (removal) event, and cancel the next UI update
        // to prevent updating time after the DOM element was removed.
        element.bind('$destroy', function() {
            $timeout.cancel(timeoutId);
        });

        updateLater(); // kick off the UI update process.
    };
});

