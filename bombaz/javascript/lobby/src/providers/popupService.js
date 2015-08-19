/**
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
