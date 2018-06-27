import log from "../app/log.js";
import App from "../app/app.js";
import * as Event from "../app/event.js";

import ClientConnection from "./clientConnection.js";

import Driver from "../driver/driver.js";
import Input from "../driver/input/input.js";
import Keyboard from "../driver/input/keyboard.js";

import Control from "../control/control.js";
import Command from "../command/command.js";
import ChangeControl from "../command/changeControl.js";

import ApplicationError from "../error/applicationError.js";
import NotImplementedError from "../error/notImplementedError.js";

export default class Client {

    /**
     * Constructs the application client.
     * 
     * @param app {App} The application client connects to.
     * @param connection {ClientConnection} The connection to use to communicate with server.
     */
    constructor(app, connection) {

        this.app = app;
        this.connection = connection;
        this.clientId = null;
        this._controlBindings = {};

        if (this.app.initialized) {

            this.init();
        }
        else {

            this.app.event.on("Initializing", this.init, this);
        }
    }


    /**
     * Called either during app initialization, or if the app's
     * already initialized when passed to client, immediately
     * after client's constructed.
     */
    init() {

        Event.Global.on("DriverLoaded", this.onDriverLoaded, this);
        Event.Global.on("DriverUnloaded", this.onDriverUnloaded, this);
        Event.Global.on("InputChanged", this.onInputChanged, this);

        this.app.event.on("ControlChanged", this.onControlChanged, this);

        this.keyboard = new Keyboard();
        this.keyboard.load();
    }

    onDriverLoaded(data) {

        log.info(`${data.driver.name} driver loaded.`);
    }

    onDriverUnloaded(data) {

        log.info(`Driver ${data.driver.name} driver unloaded.`);
    }

    bindControls(bindings) {

        log.info("Binding controls:");

        for (let id in bindings) {

            let control = bindings[id];
            this._controlBindings[id] = control;

            log.info(`- ${id} translates to ${control.name}`);
        }
    }

    /**
     * Translates a physical control into an app control.
     * 
     * @param control {Control} Physical control to translate.
     */
    translate(control) {

        let id = control.getId();
        let translatedControl = this._controlBindings[id];
        if (translatedControl) {

            translatedControl.value = control.value;
            return translatedControl;
        }

        return undefined;
    }

    /**
     * InputChanged event handler.
     * 
     * @param control {Control} Input control that was changed.
     */
    onInputChanged(control) {

        let state = this.app.currentState();
        if (state.has(control.getId())) {

            this.app.changeControl(control);
        }

        let translatedControl = this.translate(control);
        if (translatedControl && state.has(translatedControl.getId())) {

            this.app.changeControl(translatedControl);
        }
    }

    /**
     * Handles ControlChanged application event by forwarding it to server.
     * 
     * @param data {*} Application state and control details. 
     */
    onControlChanged(data) {

        if (!data.byAuthority) { // byAuthority flag indicates that the command comes from the server, so no need to send it back.

            this.send({
                type: "ControlChanged",
                data: {
                    frame: data.state.int("frame"),
                    id: data.id,
                    type: data.type,
                    name: data.name,
                    value: data.value,
                    oldValue: data.oldValue
                }
            });
        }
    }

    /**
     * Joins a running server.
     * 
     * @param target {*} Target server to join.
     */
    join(target) {

        if (this.connection.connected) {

            throw new ApplicationError("Can't join, already in a game. Leave the current game first.")
        }

        this.clientId = this.connection.connect(target, this.receive, this);

        log.info(`Joined ${target.toString()} server as ${this.clientId}`);
    }

    /**
     * Leaves the server.
     */
    leave() {

        if (!this.connection.connected) {

            throw new ApplicationError("Con't leave, not in a game.");
        }

        this.connection.disconnect();

        log.info("Left the server.");
    }

    /**
     * Sends a message to the server. Requires a successful join.
     * 
     * @param messag {*} Message to send to the server. 
     */
    send(message) {

        log.debug(`Sending message to server: ${message}`);

        this.connection.send(message);
    }

    /**
     * Called when a message is recevied from the server.
     * 
     * @param message {*} Message received from the server
     */
    receive(message) {

        log.debug(`Received message from server: ${message}`);

        switch (message.type) {

            case "ControlChanged":
                let frame = message.data.frame;
                let control = this.app.controls[message.data.name];
                control.value = message.data.value;
                let command = new ChangeControl(control, true);

                this.app.frames.execute(frame, command);
                break;
        }
    }

    toString() {

        return `${this.constructor.name} using ${this.connection.constructor.name}`;
    }
}