import log from "./log.js";

import App from "./app.js";
import State from "../state/state.js";
import Command from "../command/command.js";

export default class Scene {

    /**
     * Constructs a screen.
     * @param name {String} Name of this scene.
     * @param app {App} Parent app that this scene belongs to.
     */
    constructor(name, app) {

        log.info(`Constructing scene ${name}...`);

        this.name = name;
        this.app = app;
    }

    /**
     * Initializes this scene - called just before the scene starts.
     * 
     * @param state {State} Current app state.
     */
    init(state) {

        log.info(`Initializing scene ${this.name}...`);
        
        state.string("scene", this.name);
    }

    /**
     * Cleans-up this scene - called just before the scene ends.
     * @param state {State} Current app state.
     */
    cleanup(state) {

        log.info(`Cleaning up scene ${this.name}...`);
        
        state.string("scene", null);
    }

    /**
     * Provides an opportunity for a screen to process a command.
     * 
     * @param state {State} Current app state to apply the command to.
     * @param command {Command} Command to apply to the state.
     */
    processCommand(state, command) {
        
    }

    /**
     * Provides an opportunity for a screen to process a frame.
     * 
     * @param state {State} Current app state to apply the frame logic to.
     */
    processFrame(state) {

    }
}