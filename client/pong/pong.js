import log from "../app/log.js";
import App from "../app/app.js";
import Keyboard from "../driver/input/keyboard.js";
import Command from "../command/command.js";
import * as Controls from "./controls.js";

export class PongApp extends App {

    constructor() {

        super();

        this.controlChanged.on(this.onControlChanged);
    }

    init() {

        super.init();

        super.registerControl(new Controls.PlayerLeftUpControl());
        super.registerControl(new Controls.PlayerLeftDownControl());
        super.registerControl(new Controls.PlayerRightUpControl());
        super.registerControl(new Controls.PlayerRightDownControl());

        let mainContainer = document.createElement("div");
        mainContainer.innerHTML = ""
            + "<div>P1 UP:   <span id='PlayerLeftUp_control'>&nbsp;</span><div>"
            + "<div>P1 DOWN: <span id='PlayerLeftDown_control'>&nbsp;</span><div>"
            + "<div>P2 UP:   <span id='PlayerRightUp_control'>&nbsp;</span><div>"
            + "<div>P2 DOWN: <span id='PlayerRightDown_control'>&nbsp;</span><div>";

        document.body.appendChild(mainContainer);
    }

    translate(control) {

        if (control.type == "Key") {

            switch (control.name) {

                case "W": return new Controls.PlayerLeftUpControl(control.value);
                case "S": return new Controls.PlayerLeftDownControl(control.value);
                case "I": return new Controls.PlayerRightUpControl(control.value);
                case "K": return new Controls.PlayerRightDownControl(control.value);
            }
        }

        return super.translate(control);
    }

    processCommand(state, command) {

        return super.processCommand(state, command);
    }

    onControlChanged(data) {

        log.debug("control changed: " + JSON.stringify(data));

        let controlSpan = document.getElementById(data.name + "_control");
        controlSpan.innerHTML = data.value
            ? "X"
            : "&nbsp;";
    }

    processFrame() {

        let state = super.processFrame();
    }
}