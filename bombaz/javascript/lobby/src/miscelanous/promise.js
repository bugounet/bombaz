/**
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
