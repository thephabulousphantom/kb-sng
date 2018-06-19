import log from "./log.js";
import Event from "./event.js";
import Scene from "./scene.js";

import ApplicationError from "../error/applicationError.js";

import Control from "../control/control.js";

import State from "../state/state.js";
import Frame from "../state/frame.js";
import FrameBuffer from "../state/frameBuffer.js";
import Property from "../state/property.js";
import Entity from "../state/entity.js";

import ModifyState from "../command/modifyState.js";
import RegisterControl from "../command/registerControl.js";
import UnregisterControl from "../command/unregisterControl.js";
import ChangeControl from "../command/changeControl.js";
import ChangeScene from "../command/changeScene.js";

import Driver from "../driver/driver.js";
import Input from "../driver/input/input.js";
import Keyboard from "../driver/input/keyboard.js";

export default class App {

    constructor() {

        log.info("Constructing the app...");

        Event.register("ControlRegistered");
        Event.register("ControlUnregistered");
        Event.register("ControlChanged");

        this.running = false;
        this.frames = new FrameBuffer();
        this.frameNumber = 0;
        this._controlBindings = {};
        this.rootEntity = new Entity("root");
        this._initialized = false;
        this.scenes = {};
        
        window.addEventListener("load", this.init.bind(this));
    }

    bindControls(bindings) {

        for (let id in bindings) {

            let control = bindings[id];
            this._controlBindings[id] = control;
        }
    }

    unbindControls(bindings) {

        for (let id in bindings) {

            if (this._controlBindings[id]) {

                delete this._controlBindings[id];
            }
        }
    }

    init() {

        log.info("Initializing the app...");

        Event.on("DriverLoaded", this.onDriverLoaded);
        Event.on("DriverUnloaded", this.onDriverUnloaded);
        Event.on("InputChanged", this.onInputChanged.bind(this));

        this._keyboard = new Keyboard();
        this._keyboard.load();

        this._initialized = true;
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

    /**
     * Registers a scene, so that it can be used in the app.
     * 
     * @param scene {Scene} Scene to register.
     */
    registerScene(scene) {

        if (this.scenes[scene.name] !== undefined) {

            throw new ApplicationError(`Can't register scene ${scene.name} - it's already registered.`);
        }

        this.scenes[scene.name] = scene;
    }

    /**
     * Unregisters a scene, so that it can no longer be used in the app.
     * 
     * @param scene {Scene} Scene to unregister.
     */
    unregisterScene(scene) {

        if (this.scenes[scene.name] === undefined) {

            throw new ApplicationError(`Can't unregister scene ${scene.name} - it's not registered.`);
        }

        delete this.scenes[scene.name];
    }

    /**
     * Issues a command to switch to a different scene.
     * 
     * @param name {String} Name of a registered scene to switch to.
     */
    changeScene(name) {

        this.issueCommand(new ChangeScene(name));
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

    /**
     * Starts the app.
     */
    run() {

        log.info("Running the app...");

        this.running = true;
        this.tick();
    }

    /**
     * Stops the app.
     */
    stop() {

        log.info("Stopping the app...");

        this.running = false;
    }

    /**
     * Called once per animation frame, @ 60 FPS.
     */
    tick() {

        if (this.running) {

            requestAnimationFrame(this.tick.bind(this));
        }

        if (this._initialized) {

            this.processFrame();
        }
    }

    /**
     * Provides an opportunity for the app to process a command.
     * 
     * @param state {State} Current app state.
     * @param command {Commmand} Issued command to process.
     */
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

                    Event.raise( "ControlRegistered", {
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

                    Event.raise("ControlUnregistered", {
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

                    Event.raise("ControlChanged", {
                        state: state,
                        id: id,
                        value: command.control.value,
                        oldValue: oldValue
                    });
                }
                break;

            case "ChangeScene":
                {
                    let name = command.sceneName;

                    if(this.scenes[name] === undefined) {

                        throw new ApplicationError(`Can't switch to unknown scene ${name}.`);
                    }

                    if (state.string("scene")) {

                        let currentScene = this.scenes[state.string("scene")];
                        currentScene.cleanup(state);
                    }

                    let scene = this.scenes[name];
                    scene.init(state);
                }
                break;
        }

        if (state.string("scene")) {

            let scene = this.scenes[state.string("scene")];

            scene.processCommand(state, command);
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

        Property.context = state;
        this.rootEntity.processFrame();

        if (state.string("scene")) {

            let scene = this.scenes[state.string("scene")];

            scene.processFrame(state);
        }

        return state;
    }
}