import App from "../app/app.js";
import Scene from "../app/scene.js";
import Event from "../app/event.js";
import State from "../state/state.js";
import Command from "../command/command.js";
import * as Controls from "./controls.js";

export default class SceneGameplay extends Scene {

    /**
     * Constructs the SceneGameplay scene.
     * 
     * @param app {App} Parent app that this scene belongs to.
     */
    constructor(app) {

        super("Gameplay", app);

        this.controls = {};
        this.controls.PlayerLeftUp = new Controls.PlayerLeftUpControl();
        this.controls.PlayerLeftDown = new Controls.PlayerLeftDownControl();
        this.controls.PlayerRightUp = new Controls.PlayerRightUpControl();
        this.controls.PlayerRightDown = new Controls.PlayerRightDownControl();
    }

    /**
     * Initializes this scene - called just before the scene starts.
     * 
     * @param state {State} Current app state.
     */
    init(state) {

        super.init(state);
        
        document.body.innerHTML = "Gameplay.";

        this.app.registerControl(this.controls.PlayerLeftUp);
        this.app.registerControl(this.controls.PlayerLeftDown);
        this.app.registerControl(this.controls.PlayerRightUp);
        this.app.registerControl(this.controls.PlayerRightDown);
        this.app.bindControls({
            "$-Key-W": this.controls.PlayerLeftUp,
            "$-Key-S": this.controls.PlayerLeftDown,
            "$-Key-I": this.controls.PlayerRightUp,
            "$-Key-K": this.controls.PlayerRightDown
        });

        Event.on("ControlChanged", this.onControlChanged, this);
    }

    /**
     * Cleans-up this scene - called just before the scene ends.
     * @param state {State} Current app state.
     */
    cleanup(state) {

        super.cleanup(state);

        document.body.innerHTML = "";
        
        Event.off("ControlChanged", this.onControlChanged, this);

        this.app.unregisterControl(this.controls.PlayerLeftUp);
        this.app.unregisterControl(this.controls.PlayerLeftDown);
        this.app.unregisterControl(this.controls.PlayerRightUp);
        this.app.unregisterControl(this.controls.PlayerRightDown);
        this.app.unbindControls({
            "$-Key-W": this.controls.PlayerLeftUp,
            "$-Key-S": this.controls.PlayerLeftDown,
            "$-Key-I": this.controls.PlayerRightUp,
            "$-Key-K": this.controls.PlayerRightDown
        });
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