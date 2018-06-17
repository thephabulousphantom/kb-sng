import log from "../app/log.js";
import App from "../app/app.js";
import State from "../app/state.js";
import Command from "../command/command.js";
import Scene from "../app/scene.js";
import SceneReady from "./sceneReady.js";
import SceneGameplay from "./sceneGameplay.js";

export class PongApp extends App {

    constructor() {

        super();
    }

    init() {

        this.registerScene(new SceneReady(this));
        this.registerScene(new SceneGameplay(this));

        this.changeScene("Ready");
        
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