import ApplicationError from "../error/applicationError.js";
import CallbackMissingError from "../error/callbackMissingError.js";

class Event {

    constructor() {
    }

    /**
     * Registers a new event - only after an event is registered,
     * it can be raised or listened to.
     * 
     * @param eventName {String} Name of the event to register.
     */
    register(eventName) {

        if (events.has(eventName)) {

            throw new ApplicationError(`Can't register event ${eventName}, it's already registered.`);
        }

        events.set(eventName, new Array());
    }

    /**
     * Unregisteres an event - after it's unregistered, event
     * can no longer be raised nor listened to.
     * 
     * @param eventName {String} Name of the event to unregister.
     */
    unregister(eventName) {

        if (!events.has(eventName)) {

            throw new ApplicationError(`Can't unregister unknown event ${eventName}.`);
        }

        events.delete(eventName);
    }

    /**
     * Raises an event so that subscribed listeners can listen to it.
     * 
     * @param eventName {String} Name of the event to  raise.
     * @param data {*} Optional, event-specific data to pass to event handlers.
     */
    raise(eventName, data) {

        if (!events.has(eventName)) {

            throw new ApplicationError(`Can't raise unknown event ${eventName}.`);
        }

        let listeners = events.get(eventName);

        for (let i = 0; i < listeners.length; i++) {

            let listener = listeners[i];
            listener.callback.call(listener.context, data, listener.state);
        }
    }

    /**
     * Starts listening to an event.
     * 
     * @param eventName {String} Name of the event to start listening to.
     * @param callback {function} Function to be called once the event is raised.
     * @param state {*} Data to pass to the callback function when handling event.
     */
    on(eventName, callback, context = this, state = undefined) {

        if (!events.has(eventName)) {

            throw new ApplicationError(`Can't listen to unknown event ${eventName}.`);
        }

        if (!callback) {

            throw new CallbackMissingError("Can't attach event handler, callback not specified.");
        }

        let listener = {callback, context, state};
        let listeners = events.get(eventName);
        listeners.push(listener);
    }

    /**
     * Stops listening to an event.
     * 
     * @param eventName {String} Name of the event to stop listening to.
     * @param callback {function} Function that was originally passed when started listening.
     * @param state {*} Exact same state object that was originally passed when started listening.
     */
    off(eventName, callback, context = this, state = undefined) {

        if (!events.has(eventName)) {

            throw new ApplicationError(`Can't stop listening to unknown event ${eventName}.`);
        }

        let removed = false;
        let listeners = events.get(eventName);
        for (let i = 0; i < listeners.length; i++) {

            let listener = listeners[i];
            if (listener.callback === callback
                && listener.context === context
                && listener.state === state) {

                listeners.splice(i--, 1);
                removed = true;
            }
        }

        return removed;
    }
};

let events = new Map();
let eventSingleton = new Event();

export default eventSingleton;