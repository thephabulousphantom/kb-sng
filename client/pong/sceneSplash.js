import App from "../app/app.js";
import * as Event from "../app/event.js";
import Scene from "../app/scene.js";
import State from "../state/state.js";
import EntityImage from "../state/entityImage.js";

export default class SceneSplash extends Scene {

    constructor(app) {

        super("Splash", app)

        this.cutOffSeconds = 10;
        this.cutoffFrame = null;
    }

    init(state) {

        super.init(state);

        this.cutoffFrame = state.int("frame")||0 + this.cutOffSeconds * 60;

        this.app.event.on("ControlChanged", this.onControlChanged, this);

        let splash = this.addEntity(new EntityImage("/pong/splash.png", "Splash"));
        splash.x.value(0);
        splash.y.value(0);
        splash.width.value(100);
        splash.height.value(100);
    }

    cleanup(state) {

        super.cleanup(state);

        this.app.event.off("ControlChanged", this.onControlChanged, this);
    }

    onControlChanged(data) {

        if (data.type == "App") {

            this.app.changeScene("Gameplay");
        }
    }

    processFrame(state) {

        if (state.int("frame") >= this.cutoffFrame) {

            this.app.changeScene("Gameplay");
        }
    }
}