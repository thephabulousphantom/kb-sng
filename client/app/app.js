import log from "./log.js";
import Event from "./event.js";
import Driver from "../driver/driver.js";
import Input from "../driver/input/input.js";
import Control from "../control/control.js";
import Keyboard from "../driver/input/keyboard.js";
import ModifyState from "../command/modifyState.js";
import RegisterControl from "../command/registerControl.js";
import UnregisterControl from "../command/unregisterControl.js";
import ChangeControl from "../command/changeControl.js";
import State from "./frame.js";
import Frame from "./frame.js";
import FrameBuffer from "./frameBuffer.js";
import ApplicationError from "../error/applicationError.js";

export default class App {

    constructor() {

        log.info("Constructing the app...");

        this.running = false;
        this.controlRegistered = new Event("ControlRegistered");
        this.controlUnregistered = new Event("ControlUnregistered");
        this.controlChanged = new Event("ControlChanged");
        this.frames = new FrameBuffer();
        this.frameNumber = 0;
        this._controlBindings = {};
        
        window.addEventListener("load", this.init.bind(this));
    }

    bindControls(bindings) {

        for (let id in bindings) {

            let control = bindings[id];
            if (!this._controlBindings[id]) {

                this.registerControl(control);
            }

            this._controlBindings[id] = control;
        }
    }

    unbindControls(bindings) {

        for (let id in bindings) {

            let control = bindings[id];
            if (this._controlBindings[id]) {

                this.unregisterControl(control);
            }

            delete this._controlBindings[id];
        }
    }

    init() {

        log.info("Initializing the app...");

        Driver.loaded.on(this.onDriverLoaded);
        Driver.unloaded.on(this.onDriverUnloaded);

        Input.changed.on(this.onInputChanged.bind(this));

        this._keyboard = new Keyboard();
        this._keyboard.load();
    }

    /**
     * Registers a control for state tracking.
     * 
     * @param control {Control} Control to register.
     */
    registerControl(control) {

        this.issueCommand(new RegisterControl(control));
    }

    /**
     * Unregisters a control for state tracking.
     * 
     * @param control {Control} Control to unregister.
     */
    unregisterControl(control) {

        this.issueCommand(new UnregisterControl(control));
    }

    onDriverLoaded(data) {

        log.info(`${data.driver.name} driver loaded.`);
    }

    onDriverUnloaded(data) {

        log.info(`Driver ${data.driver.name} driver unloaded.`);
    }

    /**
     * InputChanged event handler.
     * 
     * @param control {Control} Input control that was changed.
     */
    onInputChanged(control) {

        let state = this.currentState();
        if (state.has(control.getId())) {

            this.issueCommand(new ChangeControl(control));
        }

        let appControl = this.translate(control);
        if (appControl && state.has(appControl.getId())) {

            this.issueCommand(new ChangeControl(appControl));
        }
    }

    /**
     * Translates a physical control into an app control.
     * 
     * @param control {Control} Physical control to translate.
     */
    translate(control) {

        let id = control.getId();
        let boundCommand = this._controlBindings[id];
        if (boundCommand) {

            boundCommand.value = control.value;
            return boundCommand;
        }

        return undefined;
    }

    /**
     * Issues a command at current frame number.
     * 
     * @param commmand {Command} Command to isssue.
     */
    issueCommand(command) {

        this.frames.issueCommand(this.frameNumber, command);
    }

    run() {

        log.info("Running the app...");

        this.running = true;
        this.tick();
    }

    stop() {

        log.info("Stopping the app...");

        this.running = false;
    }

    tick() {

        if (this.running) {

            requestAnimationFrame(this.tick.bind(this));
        }

        this.processFrame();
    }

    processCommand(state, command) {

        switch (command.name) {

            case "ModifyState":
                state._set(command.key, command.value);
                break;

            case "RegisterControl":
                {
                    let id = command.control.getId();
                    if (state.has(id)) {

                        throw new ApplicationError(`Application control ${id} already registered.`);
                    }

                    state._set(id, command.control.value);

                    this.controlRegistered.raise({
                        state: state,
                        id: id,
                        value: command.control.value
                    });
                }
                break;

            case "UnregisterControl":
                {
                    let id = command.control.getId();
                    if (!state.has(id)) {

                        throw new ApplicationError(`Application control ${id} not registered.`);
                    }

                    state._remove(id);

                    this.controlUnregistered.raise({
                        state: state,
                        id: id
                    });
                }
                break;

            case "ChangeControl":
                {
                    let id = command.control.getId();
                    let oldValue = state._get(id);

                    state._set(id, command.control.value);

                    this.controlChanged.raise({
                        state: state,
                        id: id,
                        value: command.control.value,
                        oldValue: oldValue
                    });
                }
                break;
        }
    }

    /**
     * Returns frame identified by frameNumber, and
     * returns the application state - also makse sure 
     * that all preceding commands have been applied to 
     * the application state.
     */
    currentState() {

        return this.frames.process(
            this.frameNumber,
            this.processCommand.bind(this)
        );
    }

    /**
     * Processes a frame by incrementing frameNumber
     * and storing it in the application state under "frame" key.
     */
    processFrame() {

        this.frameNumber++;

        let state = this.currentState();
        state.int("frame", this.frameNumber);

        return state;
    }
}