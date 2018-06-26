import log from "../app/log.js";

import App from "../app/app.js";
import Scene from "../app/scene.js";
import SceneSplash from "./sceneSplash.js";
import SceneGameplay from "./sceneGameplay.js";

import Control from "../control/control.js";
import DigitalControl from "../control/digitalControl.js";
import AnalogControl from "../control/analogControl.js";

import State from "../state/state.js";
import Command from "../command/command.js";

export class EnterControl extends DigitalControl {

    constructor(value) {

        super("Enter", "App", false, value);
    }
}

export class PlayerLeftUpControl extends DigitalControl {

    constructor(value) {

        super("PlayerLeftUp", "App", false, value);
    }
}

export class PlayerLeftDownControl extends DigitalControl {

    constructor(value) {

        super("PlayerLeftDown", "App", false, value);
    }
}

export class PlayerRightUpControl extends DigitalControl {

    constructor(value) {

        super("PlayerRightUp", "App", false, value);
    }
}

export class PlayerRightDownControl extends DigitalControl {

    constructor(value) {

        super("PlayerRightDown", "App", false, value);
    }
}

export class PongApp extends App {

    constructor() {

        super();
    }

    init() {

        this.registerControl(new EnterControl());
        this.registerControl(new PlayerLeftUpControl());
        this.registerControl(new PlayerLeftDownControl());
        this.registerControl(new PlayerRightUpControl());
        this.registerControl(new PlayerRightDownControl());

        this.registerScene(new SceneSplash(this));
        this.registerScene(new SceneGameplay(this));

        this.changeScene("Splash");

        super.init();
    }
}