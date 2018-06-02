import log from "../app/log.js";
import App from "../app/app.js";
import Keyboard from "../driver/input/keyboard.js";
import Command from "../command/command.js";

export class PongApp extends App {

    constructor() {

        super();

        this.controlChanged.on(this.onControlChanged);
    }

    init() {

        super.init();

        super.registerControl({ name: "P1_MOVE_UP" });
        super.registerControl({ name: "P1_MOVE_DOWN" });
        super.registerControl({ name: "P2_MOVE_UP" });
        super.registerControl({ name: "P2_MOVE_DOWN" });

        let mainContainer = document.createElement("div");
        mainContainer.innerHTML = ""
            + "<div>P1 UP:   <span id='P1_MOVE_UP_control'>&nbsp;</span><div>"
            + "<div>P1 DOWN: <span id='P1_MOVE_DOWN_control'>&nbsp;</span><div>"
            + "<div>P2 UP:   <span id='P2_MOVE_UP_control'>&nbsp;</span><div>"
            + "<div>P2 DOWN: <span id='P2_MOVE_DOWN_control'>&nbsp;</span><div>";

        document.body.appendChild(mainContainer);
    }

    translate(input) {

        switch (input.name) {

            case "W": return { name: "P1_MOVE_UP" };
            case "S": return { name: "P1_MOVE_DOWN" };
            case "I": return { name: "P2_MOVE_UP" };
            case "K": return { name: "P2_MOVE_DOWN" };
        }

        return super.translate(input);
    }

    processCommand(command) {

        super.processCommand(command);
    }

    onControlChanged(data) {

        log.info("control changed: " + JSON.stringify(data));

        let controlSpan = document.getElementById(data.after.name + "_control");
        controlSpan.innerHTML = data.after.active
            ? "X"
            : "&nbsp;";
    }

    processFrame() {

    }
};
