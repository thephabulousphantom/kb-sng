import App from "../app/app.js";
import Scene from "../app/scene.js";
import State from "../state/state.js";
import Command from "../command/command.js";

export default class SceneGameplay extends Scene {

    /**
     * Constructs the SceneGameplay scene.
     * 
     * @param app {App} Parent app that this scene belongs to.
     */
    constructor(app) {

        super("Gameplay", app);
    }

    /**
     * Initializes this scene - called just before the scene starts.
     * 
     * @param state {State} Current app state.
     */
    init(state) {

        super.init(state);
        
        this.app.event.on("ControlChanged", this.onControlChanged, this);
    }

    /**
     * Cleans-up this scene - called just before the scene ends.
     * @param state {State} Current app state.
     */
    cleanup(state) {

        super.cleanup(state);

        this.app.event.off("ControlChanged", this.onControlChanged, this);
    }

    onControlChanged(data) {

        let state = data.state;
        let id = data.id;
        let value = data.value;
    }

    /**
     * Provides an opportunity for a screen to process a command.
     * 
     * @param state {State} Current app state to apply the command to.
     * @param command {Command} Command to apply to the state.
     */
    processCommand(state, command) {
        
        super.processCommand(state, command);
    }

    /**
     * Provides an opportunity for a screen to process a frame.
     * 
     * @param state {State} Current app state to apply the frame logic to.
     */
    processFrame(state) {

        super.processFrame(state);
    }
}