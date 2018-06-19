import App from "../app/app.js";
import Scene from "../app/scene.js";
import Event from "../app/event.js";
import State from "../state/state.js";

export default class SceneSplash extends Scene {

    constructor(app) {

        super("Splash", app)

        this.cutOffSeconds = 10;
        this.cutoffFrame = null;
    }

    init(state) {

        super.init(state);

        this.cutoffFrame = state.int("frame")||0 + this.cutOffSeconds * 60;

        document.body.innerHTML = "Welcome to PONG.";

        Event.on("InputChanged", this.onInputChanged, this);
    }

    cleanup(state) {

        super.cleanup(state);

        document.body.innerHTML = "";
        
        Event.off("InputChanged", this.onInputChanged, this);
    }

    onInputChanged(control) {

        if (control.value) {

            this.app.changeScene("Gameplay");
        }
    }

    processFrame(state) {

        if (state.int("frame") >= this.cutoffFrame) {

            this.app.changeScene("Gameplay");
        }
    }
}