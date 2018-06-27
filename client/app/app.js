import log from "./log.js";
import * as Event from "./event.js";
import Scene from "./scene.js";

import ApplicationError from "../error/applicationError.js";

import State from "../state/state.js";
import Frame from "../state/frame.js";
import FrameBuffer from "../state/frameBuffer.js";
import Property from "../state/property.js";
import Entity from "../state/entity.js";

import Control from "../control/control.js";

import ModifyState from "../command/modifyState.js";
import ChangeControl from "../command/changeControl.js";
import ChangeScene from "../command/changeScene.js";

export default class App {

    constructor() {

        log.info("Constructing the app...");

        this.initialized = false;

        this.running = false;
        this.frames = new FrameBuffer();
        this.frameNumber = 0;
        this.rootEntity = new Entity("root");
        this.controls = {};
        this.scenes = {};

        this.event = new Event.Event();
        this.event.register("Initializing");
        this.event.register("RegisteringControl");
        this.event.register("ChangingControl");
        this.event.register("RegisteringScene");
        this.event.register("ChangingScene");
        this.event.register("SceneChanged");
        this.event.register("ExecutingCommand");
        this.event.register("ControlRegistered");
        this.event.register("ControlChanged");

        window.addEventListener("load", this.init.bind(this));
    }

    init() {

        log.info("Initializing the app...");

        this.event.raise("Initializing");

        this.initialized = true;
    }

    /**
     * Registers a control for state tracking.
     * 
     * @param control {Control} Control to register.
     */
    registerControl(control) {

        log.info(`Registering control ${control.name}...`);

        this.event.raise("RegisteringControl", { control });

        this.controls[control.name] = control;

        let state = this.currentState();
        let id = control.getId();
        if (state.has(id)) {

            throw new ApplicationError(`Application control ${id} already registered.`);
        }

        state._set(id, control.value);

        this.event.raise( "ControlRegistered", {
            state: state,
            id: id,
            value: control.value
        });
    }

    /**
     * Changes a control state.
     * 
     * @param control {*} Control with changed state. 
     */
    changeControl(control) {

        log.info(`Changing control ${control.name}...`);

        this.event.raise("ChangingControl", { control });

        this.execute(new ChangeControl(control));
    }

    /**
     * Registers a scene, so that it can be used in the app.
     * 
     * @param scene {Scene} Scene to register.
     */
    registerScene(scene) {

        log.info(`Registering scene ${scene.name}...`);

        this.event.raise("RegisteringScene", { scene });

        this.scenes[scene.name] = scene;
    }

    /**
     * Issues a command to switch to a different scene.
     * 
     * @param name {String} Name of a registered scene to switch to.
     */
    changeScene(name) {

        log.info(`Changing scene to ${name}...`);
        
        this.event.raise("ChangingScene", { name });
        
        this.execute(new ChangeScene(name));
    }

    /**
     * Issues a command at current frame number.
     * 
     * @param commmand {Command} Command to issue.
     */
    execute(command) {

        if (log.level >= log.severity.debug) {

            log.debug(`Executing command: : ${JSON.stringify(command)}`);
        }

        this.event.raise("ExecutingCommand", { command });
        
        this.frames.execute(this.frameNumber, command);
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

        if (this.initialized) {

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

            case "ChangeControl":
                {
                    let id = command.control.getId();
                    let oldValue = state._get(id);

                    state._set(id, command.control.value);

                    this.event.raise("ControlChanged", {
                        state: state,
                        id: id,
                        type: command.control.type,
                        name: command.control.name,
                        byAuthority: command.byAuthority,
                        value: command.control.value,
                        oldValue: oldValue,
                    });
                }
                break;

            case "ChangeScene":
                {
                    let name = command.sceneName;
                    let oldScene = null;

                    if(this.scenes[name] === undefined) {

                        throw new ApplicationError(`Can't switch to unknown scene ${name}.`);
                    }

                    if (state.string("scene")) {

                        oldScene = this.scenes[state.string("scene")];
                        oldScene.cleanup(state);
                    }

                    let scene = this.scenes[name];
                    scene.init(state);

                    this.event.raise("SceneChanged", { scene, oldScene });
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