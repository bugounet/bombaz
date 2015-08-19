lobbyApp
// Register the 'lobbyScoresTable' directive factory method.
// We inject $timeout and dateFilter service since the factory method is DI.
    .directive('lobbyScoresTable', function($timeout, $http) {
        // return the directive link function. (compile function not needed)
        return function(scope, element, attrs) {
            var timeoutId,  // timeoutId, so that we can cancel the time updates
                // used to update the UI
                user_id = 0;  // user_id to request user's own scores
            function updateTable() {
                // fetch scores on the rest API
                $http.get('/lobby/api/1.0/scores/' + user_id).success(
                    // onn success generate a list of scores
                    function(data, status, headers, config) {
                        // create a formatting string
                        var format = '<li class="score">%d</li>\n';
                        // and concatenate each score to the following string.
                        var output_html = '';
                        // for each score : add the line
                        var i = 0;
                        for (i = 0; i < data.list.length; i++) {
                            output_html += format.replace('%d', data.list[i]);
                        }
                        // and replace the content of the directive
                        element.html(output_html);
                    }
                ).error(function (data, status, header, config) {
                    // on error : display an error message.
                    element.text('Could\'nt get scores');
                });
            }
            // schedule update in one second
            function updateLater() {
                // save the timeoutId for canceling
                timeoutId = $timeout(function() {
                    updateTable(); // update DOM
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
    }
);

