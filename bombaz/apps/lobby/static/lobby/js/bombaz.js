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


;/**
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

;lobbyControllers.controller('navCtrl', ['$scope', '$location',
    function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'home';
            return page === currentRoute ? 'active' : '';
        };
    }]);

;/**
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
;lobbyControllers.controller('scoresController', ['$scope', '$http',
    function ($scope, $http) {
        "use strict";
        $scope.list = ";";
}]);
;/**
 * Created by bugounet on 16/05/15.
 */

var FormattingStringRegex =  /\%(\(\w+\))?[s]/gi;

function formatString (format, data) {
    // following values will be defined in loop iterations
    var match, expression, namedArg, value;
    // create return variable
    var s = format;
    // create counter
    var i = 0;
    // assignment not used as expression in while because jsLint does not
    // like that kind of things.
    match = FormattingStringRegex.exec(this.displayFormat);
    // for each matching group found, replace data
    while (match) {
        expression = match[0];
        namedArg = match[1];
        if (namedArg !== undefined) {
            // Matching unnamed argument case.
            if (data[namedArg] === undefined) {
                // Fail if array is too short
                throw ("Failed to format string \"" + format + "\" : " +
                namedArg + " missing in formatting data (expression " +
                expression + " not matched.");
            }
            // replace expression in template.
            value = data[namedArg];
        } else {
            // matching named argument case.
            if (data[i] === undefined) {
                // fail if named argument value not given.
                throw ("Failed to format string \"" + format + "\" : " +
                "Not enough arguments in formatting data to match " +
                " expression \"" + expression + "\".");
            }
            // replace expression in template
            value = data[i];
        }
        // replace expression by its value
        s = s.replace(expression, value);
        // increment and get next matching regex group if any.
        i++;
        match = FormattingStringRegex.exec(this.displayFormat);
    }
    if (i !== data.length) {
        // warn if some values ar not used in the formatting
        console.warn("Formatting data unused while formatting \"" + format +
            "\"");
    }
    return s;
}

function EmptyCatalogItem() {
    "use strict";
    this.name = "No result";
    this.displayFormat = "%(name)s";
    this.toString = function () {
        formatString(this.displayFormat, { name: this.name });
    };
}

function CatalogItem(product) {
    "use strict";
    this.name = product.name;
    this.price = product.price;
    this.specialOffer = product.discount !== 0;
    this.finalPrice = product.price - product.discount;

    this.displayFormat = "%(specialOfferPrefix)s%(name)s -- %(price)s GP";

    this.toString = function () {
        formatString(this.displayFormat, {
            name: this.name,
            price: this.finalPrice,
            specialOfferPrefix: this.specialOffer ? "[PROMO]" : "",
        });
    };
}

lobbyControllers.controller('storeController', ['$scope', '$http', 'popupService',
    function ($scope, $http, $popupService) {
        "use strict";

        $scope.cart = [];

        $scope.storeGetMapsCatalog = function () {
            $http.get(
                {
                    url: 'lobby/api/store/catalogue/maps'
                }
            ).success(function (data) {
                $scope.fillCatalogue(data.maps);
            }).error(function (data) {
                $popupService.error("Could not get maps catalogue.");
                $scope.catalogue = [new EmptyCatalogItem()];
            });
        };

        $scope.storeGetSkinsCatalog = function () {
            $http.get(
                {
                    url: 'lobby/api/store/catalogue/skins'
                }
            ).success(function (data) {
                $scope.fillCatalogue(data.skins);
            }).error(function (data) {
                $popupService.error("Could not get skins catalogue.");
                $scope.catalogue = [new EmptyCatalogItem()];
            });
        };

        $scope.fillCatalogue = function (list) {
            $scope.catalogue = [];
            var arr = $scope.catalogue,
                // will be set in loop
                i, item;
            // iterate over maps, create CatalogItem items and fill the
            // scope catalogue.
            for (i = 0; i < list.length; i++) {
                item = new CatalogItem(list[i]);
                arr[arr.length] = item;
            }
        };

        $scope.storeAddToCart = function (product) {
            console.log("adding product ", product, "to cart");
            var arr = $scope.cart;
            // append product at end of cart
            arr[arr.length] = product;
            $popupService.info("Product added to cart");
        };

        $scope.storeRemoveFromCart = function (product) {
            console.log("Removing ", product, "from cart");
            var position = $scope.cart.indexOf(product);
            // if product position not found, curse and exit
            if (position === -1) {
                console.error("product not found in cart.");
                return;
            }
            // remove item at product position from cart.
            $scope.cart.splice(position, 1);
            $popupService.info("Product removed from cart");
        };

        $scope.storeBuy = function () {
            console.log("Validating cart.");
            $http.post(
                {
                    url: 'lobby/api/v1_0/store/buy/',
                    data: $scope.cart,
                }
            ).success(function (data) {
                // empty view cart on success
                $scope.cart = [];
                $popupService.success("Order successfully completed.");
            }).error(function (data) {
                $popupService.error("Could not validate your order. You have" +
                    " not been charged for that and the support team will" +
                    " contact you soon for further investigation.");
            });
        };

}]);
;lobbyApp
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

;/**
 * Created by bugounet on 16/05/15.
 *
 * Simple promise module handling exceptions, and pre/post state change
 * callback definition.
 */


function Promise(failsafe) {
    /* Promise object. Lets you make asynchronous tasks source code more
     human friendly.

    argument failsafe: boolean to tell if you want to catch exceptions and log
     them or let the break the whole system.
     */
    "use strict";
    var self = this;
    this._failsafe = (failsafe === undefined) ? true : (!!failsafe);
    this._status = 'running';
    this._callbacks = null;

    this.done = function (callback) {
        /* set a new callback to be called on state change. If state is already
         in terminated state, the callback you're providing will instantly be
         called.

         argument callback : must be a callable item
         */
        // add callback in list (/create the list if any)
        if (self._callbacks === null) {
            self._callbacks = [callback];
        } else {
            self._callbacks[self._callbacks.length] = callback;
        }
        // if status already terminated : directly call function you just set
        if (self._status !== 'running') {
            return self._finish();
        }
        return self;
    };

    this.succeed = function (){
        /* set the promise to success state (that calls the callbacks)
         */
        self._status = 'succeeded';
        if (self._status !== 'busy') {
            self._finish();
        }
    };

    this.fail = function () {
        /* set the promise to failure state (that calls the callbacks)
         */
        self._status = 'failed';
        self._finish();
    };

    this.cancel = function () {
        /* set the promise to cancellation state (that calls the callbacks)
         */
        self._status = 'cancelled';
        self._finish();
    };

    this._finish = function () {
        /* private method actually calling listed callbacks.

        /!\ stored callbacks will be lost on function exit.

        returns : the promise itself.
         */
        if (self._callbacks === null){
            return self;
        }
        var i = 0;
        // set status to busy while calling callbacks
        var status = self._status;
        self._status = 'busy';
        // call callbacks
        for(i=0; i< self._callbacks.length; i++) {
            if(self._failsafe === true){
                try {
                    self._callbacks[i].call([status]);
                } catch (exception) {
                    console.error(exception);
                }
            } else {
                self._callbacks[i].call([status]);
            }
        }
        // reset status to previous value
        self._status = status;
        // clean the list for future use (just in case you call the .done
        // method later)
        self._callbacks = [];
        return self;
    };
}
;/**
 * Created by bugounet on 16/05/15.
 *
 * Provides notifications on top line for user.
 */

var POPUP_COLORS = {
    info: {
        text: '#fff',
        background: '#0be'
    },
    warn: {
        text: '#221',
        background: '#f80'
    },
    error: {
        text: '#de0',
        background: '#b11'
    },
    success: {
        text: '#111',
        background: '#0d0'
    },
    default: {
        text: 'eee',
        background: '#342'
    }
};

function Popup(id ,popupType){
    /* Popup containing various messages. Can be of type
     'info', 'success', 'warn', 'error' or 'default'.

     argmuent id: mandatory id is required to create a unique popup content on
        page so other popup won't interact with it.

     argument popupType: color of popup
    */
    "use strict";
    var self = this;

    this.id = id;
    this.type = popupType;
    this.message = "";
    this.autoCloseTask = null;
    // default popup out duration : 500 ms
    this.POPOUT_DURATION = 500;

    this.color = POPUP_COLORS[popupType];
    if (this.color === undefined) {
        this.color = POPUP_COLORS.default;
    }

    this.pop = function (message) {
        /* Open new popup with message inside.

        argument message : message to display
        */
        var dst = document.querySelector("#popupPopingArea");
        if (dst === null) {
            throw("No popup container defined in current page.");
        }
        self.message = message;
        dst.innerHTML += '<div id="popup' + self.id + '" class="popup-popIn" ' +
            'style="background-color:' + self.color.background + ';' +
            'color:' + self.color.text + ';'  +
            'z-index:' + self.id + '"> ' +
            message + '</div>';
    };

    this.updateMessage = function (message) {
        /* Update displayed message in popup.

        argument message : message to display instead
        */
        var popup = document.querySelector("#popup" + self.id);
        if (popup === null) {
            throw ("popup already closed");
        }
        popup.innerHTML = message;
        self.message = message;
    };

    this.close = function () {
        /* Request a smooth popup close animation.

        return: closing promise called after animations
        */
        if (self.autoCloseTask !== null) {
            clearInterval(self.autoCloseTask);
            self.autoCloseTask = null;
        }
        var p = new Promise();
        //get the popup
        var popup = document.querySelector("#popup" + self.id);
        if (popup === null) {
            throw ("popup already closed");
        }
        // change class name to make the popup pop out
        popup.className = "popup-popOut";
        // pop out animation is meant to last for 1sec, so remove the popup
        // after that
        var task = setTimeout(function() {
            self.remove();
            p.succeed();
        }, self.POPOUT_DURATION);
        self.autoCloseTask = task;
        return p;
    };

    this.remove = function () {
        /* instantly remove popup content on HTML DOM.
         */
        // reset task and stop it
        if (self.autoCloseTask !== null) {
            clearInterval(self.autoCloseTask);
        }
        self.autoCloseTask = null;
        // get the popup container
        var container = document.querySelector("#popupPopingArea");
        if (container === null) {
            throw("popup container has been removed");
        }
        // and the popup
        var popup = document.querySelector("#popup" + self.id);
        if (popup === null) {
            throw ("popup already closed");
        }
        // and ask for removal
        container.removeChild(popup);
    };
}

function PopupService(defaultDisplayDuration){
    "use strict";

    var self = this;
    this.numberOfPopupsGenerated = 0;
    this.autoCloseTask = null;
    this.currentPopup = null;
    this.defaultDisplayDuration = defaultDisplayDuration;

    this._pop = function(type, message, duration) {
        /* Popup opening private function : opens a popup & asks for closing
        previous popup if any.

         argument type: type of popup amongst ('info', 'success', 'warn',
            'error', 'default')
         argument message: string to display to user. translation must be
            done before using this function.
         [ optional ]
         argument duration: display time in seconds
         */
        if (self.currentPopup !== null) {
            console.warn("An other pop is still displayed. Will replace it as" +
                " soon as possible.");
            // clear previous popup auto closing task
            if (self.autoCloseTask) {
                clearInterval(self.autoCloseTask);
            }
            // ask previous popup to close and once it's done open ours
            self.currentPopup.close().done(function(status){
                //previous popup closed. clear popup reference. and open
                // requested popup
                self.currentPopup = null;
                self._pop(type, message, duration);
            });
            // stop here
            return;
        }

        // parse & check optional arg duration
        if (duration === undefined) {
            duration = self.defaultDisplayDuration;
        }
        // cast duration to number
        duration = Number(duration);
        // if duration is not a number or is negative or is null throw an
        // exception.
        if ((duration !== duration) || duration <= 0){
            throw ("Duration must be a positive integer.");
        }

        // create a popup
        var popup = new Popup(self.numberOfPopupsGenerated, type);
        self.currentPopup = popup;
        var task = setTimeout(function () {
            popup.close().done(function () {
                self.currentPopup = null;
            });
        }, duration * 1000);
        console.warn("Created task ", task,
            " (autoremoval of popup type ", type, ")");
        self.autoCloseTask = task;
        popup.pop(message);
        self.numberOfPopupsGenerated++;
        return popup;
    };

    this.info = function(message, duration) {
        /* Pop an information message : opens a popup & closes
        previous popup if any.

        argument message: string to display to user. translation must be
            done before using this function.
        [ optional ]
        argument duration: display time in seconds
        */
        return this._pop('info', message, duration);
    };

    this.success = function(message, duration) {
        /* Pop a success message : opens a popup & closes
        previous popup if any.

        argument message: string to display to user. translation must be
            done before using this function.
        [ optional ]
        argument duration: display time in seconds
        */
        return this._pop('success', message, duration);
    };

    this.warn = function(message, duration) {
        /* Pop a warning message : opens a popup & closes
        previous popup if any.

        argument message: string to display to user. translation must be
            done before using this function.
        [ optional ]
        argument duration: display time in seconds
        */
        return this._pop('warn', message, duration);
    };

    this.error = function(message, duration) {
        /* Pop an error message : opens a popup & closes
        previous popup if any.

        argument message: string to display to user. translation must be
            done before using this function.
        [ optional ]
        argument duration: display time in seconds
        */
        return this._pop('error', message, duration);
    };

    this.default = function(message, duration) {
        /* Pop a message : opens a popup & closes
        previous popup if any.

        argument message: string to display to user. translation must be
            done before using this function.
        [ optional ]
        argument duration: display time in seconds
        */
        return this._pop('default', message, duration);
    };
}

lobbyApp.provider("popupService", function PopupServiceProvider() {
    "use strict";
    var popupDefaultDisplayDuration = 5;

    this.popupDefaultDisplayDuration = function (value) {
        /* configuration setter telling how long do popup stay displayed

        This setup can generally be overridden by user on poping methods
         call.

         argument value: Number telling how long will your popup be displayed.
         */
        value = Number(value);
        if (value !== value){
            throw ("Couldn't parse default display duration as a number of" +
            " seconds.");
        }
        if (value <= 0) {
            throw ("Default display duration must be a strictly positive" +
            " integer.");
        }
        popupDefaultDisplayDuration = value;
    };

    this.$get = [function () {
        return new PopupService(popupDefaultDisplayDuration);
    }];
});
;/**
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
