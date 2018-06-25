import log from "../app/log.js";

import App from "../app/app.js";
import Scene from "../app/scene.js";
import SceneSplash from "./sceneSplash.js";
import SceneGameplay from "./sceneGameplay.js";

import State from "../state/state.js";
import Command from "../command/command.js";

import * as Controls from "./controls.js";

export class PongApp extends App {

    constructor() {

        super();

        log.level = log.severity.debug;
    }

    init() {

        this.controls.Enter = new Controls.EnterControl();
        this.controls.PlayerLeftUp = new Controls.PlayerLeftUpControl();
        this.controls.PlayerLeftDown = new Controls.PlayerLeftDownControl();
        this.controls.PlayerRightUp = new Controls.PlayerRightUpControl();
        this.controls.PlayerRightDown = new Controls.PlayerRightDownControl();

        this.registerControl(this.controls.Enter);
        this.registerControl(this.controls.PlayerLeftUp);
        this.registerControl(this.controls.PlayerLeftDown);
        this.registerControl(this.controls.PlayerRightUp);
        this.registerControl(this.controls.PlayerRightDown);

        this.registerScene(new SceneSplash(this));
        this.registerScene(new SceneGameplay(this));

        this.changeScene("Splash");

        super.init();
    }
}