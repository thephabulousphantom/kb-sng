import log from "./log.js";
import OnOff from "./onOff.js";
import Driver from "../driver/driver.js";
import Input from "../driver/input/input.js";
import Control from "./control.js";
import Keyboard from "../driver/input/keyboard.js";
import ModifyState from "../command/modifyState.js";
import RegisterControl from "../command/registerControl.js";
import ChangeControl from "../command/changeControl.js";
import State from "./frame.js";
import Frame from "./frame.js";
import FrameBuffer from "./frameBuffer.js";
import AlreadyRegisteredError from "../error/alreadyRegistered.js";

 export default class App {

    constructor() {

        log.info("Constructing the app...");

        this.running = false;
        this.controlRegistered = new OnOff("ControlRegistered");
        this.controlChanged = new OnOff("ControlChanged");
        this.frames = new FrameBuffer();
        this.frameNumber = 0;
        
        window.addEventListener("load", this.init.bind(this));
    }

    init() {

        log.info("Initializing the app...");

        Driver.loaded.on(this.onDriverLoaded);
        Driver.unloaded.on(this.onDriverUnloaded);

        Input.activated.on(this.onInputChanged.bind(this));
        Input.deactivated.on(this.onInputChanged.bind(this));

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

    onDriverLoaded(data) {

        log.info(`${data.driver.name} driver loaded.`);
    }

    onDriverUnloaded(data) {

        log.info(`Driver ${data.driver.name} driver unloaded.`);
    }

    /**
     * Input.activated and Input.deactivated event handler.
     * 
     * @param control {Control} Input control that was changed.
     */
    onInputChanged(control) {

        let state = this.currentState();
        if (state.has(control.getStateKey())) {

            this.issueCommand(new ChangeControl(control));
        }

        let appControl = this.translate(control);
        if (appControl && state.has(appControl.getStateKey())) {

            this.issueCommand(new ChangeControl(appControl));
        }
    }

    /**
     * Translates a physical control into an app control.
     * 
     * @param control {Control} Physical control to translate.
     */
    translate(control) {

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

        this.frameNumber++;
        this.processFrame();
    }

    processCommand(state, command) {

        switch (command.name) {

            case "ModifyState":
                state.set(command.key, command.value);
                break;

            case "RegisterControl":
                {
                    let key = command.control.getStateKey();
                    if (state.has(key)) {

                        throw new AlreadyRegisteredError(`Application control ${key} already registered.`);
                    }

                    state.set(key, command.control.value);

                    this.controlRegistered.raise({
                        state: state,
                        name: command.control.name,
                        type: command.control.type,
                        value: command.control.value
                    });
                }
                break;

            case "ChangeControl":
                {
                    let key = command.control.getStateKey();
                    let oldValue = state.get(key);

                    state.set(key, command.control.value);

                    this.controlChanged.raise({
                        state: state,
                        name: command.control.name,
                        type: command.control.type,
                        value: command.control.value,
                        oldValue: oldValue
                    });
                }
                break;
        }
    }

    currentState() {

        return this.frames.process(
            this.frameNumber,
            this.processCommand.bind(this)
        );
    }

    processFrame() {

        return this.currentState();
    }
} 