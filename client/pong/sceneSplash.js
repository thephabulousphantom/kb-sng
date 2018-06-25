import App from "../app/app.js";
import * as Event from "../app/event.js";
import Scene from "../app/scene.js";
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

        this.app.event.on("ControlChanged", this.onControlChanged, this);
    }

    cleanup(state) {

        super.cleanup(state);

        document.body.innerHTML = "";

        this.app.event.off("ControlChanged", this.onControlChanged, this);
    }

    onControlChanged(data) {

        switch (data.id) {

            case "$-App-Enter":
                this.app.changeScene("Gameplay");
                break;
        }
    }

    processFrame(state) {

        if (state.int("frame") >= this.cutoffFrame) {

            this.app.changeScene("Gameplay");
        }
    }
}