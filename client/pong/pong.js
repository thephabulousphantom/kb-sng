import log from "../app/log.js";
import App from "../app/app.js";
import Keyboard from "../driver/input/keyboard.js";
import Command from "../command/command.js";
import * as Controls from "./controls.js";
import PropertyTypes from "../app/propertyTypes.js";
import Property from "../app/property.js";
import Entity from "../app/entity.js";
import Entity2d from "../app/entity2d.js";

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

        this.ball = new Entity2d("ball", this.rootEntity);
        this.ball.x.value(0);
        this.ball.y.value(0);
        this.ball.vx.value(1.5);
        this.ball.vy.value(1);
    }

    init() {

        this.controlChanged.on(this.onControlChanged.bind(this));
        
        super.bindControls({
            "$-Key-W": this.controls.PlayerLeftUp,
            "$-Key-S": this.controls.PlayerLeftDown,
            "$-Key-I": this.controls.PlayerRightUp,
            "$-Key-K": this.controls.PlayerRightDown
        });

        let mainContainer = document.createElement("div");
        mainContainer.innerHTML = ""
            + "<div>P1 UP:   <span id='PlayerLeftUp_control'>&nbsp;</span></div>"
            + "<div>P1 DOWN: <span id='PlayerLeftDown_control'>&nbsp;</span></div>"
            + "<div>P2 UP:   <span id='PlayerRightUp_control'>&nbsp;</span></div>"
            + "<div>P2 DOWN: <span id='PlayerRightDown_control'>&nbsp;</span></div>"
            + "<div>Ball X: <span id='Ball_X'>&nbsp;</span></div>"
            + "<div>Ball Y: <span id='Ball_Y'>&nbsp;</span></div>";

        document.body.appendChild(mainContainer);

        super.init();
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

        if (state.int("frame") % 30 === 0) {

            let ballXSpanElement = document.getElementById("Ball_X");
            ballXSpanElement.innerHTML = this.ball.x.value();

            let ballYSpanElement = document.getElementById("Ball_Y");
            ballYSpanElement.innerHTML = this.ball.y.value();
        }
    }
}