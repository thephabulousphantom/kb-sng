import log from "../app/log.js";

import App from "../app/app.js";
import Scene from "../app/scene.js";
import SceneSplash from "./sceneSplash.js";
import SceneGameplay from "./sceneGameplay.js";

import State from "../state/state.js";
import Command from "../command/command.js";

export class PongApp extends App {

    constructor() {

        super();

        log.level = log.severity.debug;
    }

    init() {

        this.registerScene(new SceneSplash(this));
        this.registerScene(new SceneGameplay(this));

        this.changeScene("Splash");

        super.init();
    }

    /**
     * Provides an opportunity for the app to process a command.
     * 
     * @param state {State} Current app state.
     * @param command {Commmand} Issued command to process.
     */
    processCommand(state, command) {

        return super.processCommand(state, command);
    }

    processFrame() {

        let state = super.processFrame();
    }
}