import log from "../app/log.js";
import App from "../app/app.js";
import Keyboard from "../driver/input/keyboard.js";
import Command from "../command/command.js";
import * as Controls from "./controls.js";

export class PongApp extends App {

    constructor() {

        super();

        this.controls = {
            PlayerLeftUp: new Controls.PlayerLeftUpControl(),
            PlayerLeftDown: new Controls.PlayerLeftDownControl(),
            PlayerRightUp: new Controls.PlayerRightUpControl(),
            PlayerRightDown: new Controls.PlayerRightDownControl()
        };

        this.controlIdLookup = {};
        for (let id in this.controls) {

            this.controlIdLookup[this.controls[id].getId()] = this.controls[id];
        }
    }

    init() {

        super.init();

        this.controlChanged.on(this.onControlChanged.bind(this));
        
        super.bindControls({
            "$-Key-W": this.controls.PlayerLeftUp,
            "$-Key-S": this.controls.PlayerLeftDown,
            "$-Key-I": this.controls.PlayerRightUp,
            "$-Key-K": this.controls.PlayerRightDown
        });

        let mainContainer = document.createElement("div");
        mainContainer.innerHTML = ""
            + "<div>P1 UP:   <span id='PlayerLeftUp_control'>&nbsp;</span><div>"
            + "<div>P1 DOWN: <span id='PlayerLeftDown_control'>&nbsp;</span><div>"
            + "<div>P2 UP:   <span id='PlayerRightUp_control'>&nbsp;</span><div>"
            + "<div>P2 DOWN: <span id='PlayerRightDown_control'>&nbsp;</span><div>";

        document.body.appendChild(mainContainer);

    }

    processCommand(state, command) {

        return super.processCommand(state, command);
    }

    onControlChanged(data) {

        let state = data.state;
        let control = this.controlIdLookup[data.id];

        let controlSpan = document.getElementById(control.name + "_control");
        controlSpan.innerHTML = data.value
            ? "X"
            : "&nbsp;";
    }

    processFrame() {

        let state = super.processFrame();
    }
}