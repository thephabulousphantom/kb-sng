import Scene from "../app/scene.js";
import State from "../app/state.js";
import Command from "../command/command.js";
import * as Controls from "./controls.js";

export default class SceneReady extends Scene {

    /**
     * Constructs the SceneReady scene.
     * 
     * @param app {App} Parent app that this scene belongs to.
     */
    constructor(app) {

        super("Ready", app);

        this.controls = {};
        this.controls.Enter = new Controls.EnterControl();
    }

    /**
     * Initializes this scene - called just before the scene starts.
     * 
     * @param state {State} Current app state.
     */
    init(state) {

        super.init(state);

        document.body.innerHTML = "Press Enter or Space to continue.";

        this.app.controlChanged.on(this.onControlChanged.bind(this));

        this.app.registerControl(this.controls.Enter);

        this.app.bindControls({
            "$-Key-Enter": this.controls.Enter,
            "$-Key-Space": this.controls.Enter
        });
    }

    /**
     * Cleans-up this scene - called just before the scene ends.
     * @param state {State} Current app state.
     */
    cleanup(state) {

        super.cleanup(state);

        document.body.innerHTML = "";

        this.app.controlChanged.off(this.onControlChanged.bind(this));

        this.app.unregisterControl(this.controls.Enter);
        
        this.app.unbindControls({
            "$-Key-Enter": this.controls.Enter,
            "$-Key-Space": this.controls.Enter
        });
    }

    onControlChanged(data) {

        let state = data.state;
        switch (data.id) {

            case this.controls.Enter.getId():
                this.app.changeScene("Gameplay");
                break;
        }
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