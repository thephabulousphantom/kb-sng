import CallbackMissingError from "../error/callbackMissingError.js";

export default class Event {

    constructor(name) {

        this.name = name;
        this._listeners = new Array();
    }

    raise(data) {

        for (let i = 0; i < this._listeners.length; i++) {

            this._listeners[i].callback.call(this, data, this._listeners[i].state);
        }
    }

    on(callback, state = undefined) {

        if (!callback) {

            throw new CallbackMissingError("Can't attach event handler, callback not specified.");
        }

        var callbackInfo = { callback, state };
        this._listeners.push(callbackInfo);

        return callbackInfo;
    }

    off(callback, state = undefined) {

        let removedCallback = undefined;
        for (let i = 0; i < this._listeners.length; i++) {

            if (this._listeners[i].callback === callback && this._listeners[i].state === state) {

                delete this._listeners[i--];
                removedCallback = true;
            }
        }

        return removedCallback;
    }
};