import log from "./log.js";
import OnOff from "./onOff.js";
import Driver from "../driver/driver.js";
import Input from "../driver/input/input.js";
import Keyboard from "../driver/input/keyboard.js";
import ControlActivated from "../command/controlActivated.js";
import ControlDeactivated from "../command/controlDeactivated.js";

export default class App {

    constructor() {

        log.info("Constructing the app...");

        this.running = false;
        this.controls = {};
        this._commandBuffer = [];
        this.controlChanged = new OnOff("ControlChanged");
        
        window.addEventListener("load", this.init.bind(this));
    }

    init() {

        log.info("Initializing the app...");

        Driver.loaded.on(this.onDriverLoaded);
        Driver.unloaded.on(this.onDriverUnloaded);

        Input.activated.on(this.onInputActivated.bind(this));
        Input.deactivated.on(this.onInputDeactivated.bind(this));

        this._keyboard = new Keyboard();
        this._keyboard.load();
    }

    registerControl(control) {

        this.controls[control.name] = control;
        this.controls[control.name].active = false;
    }

    onDriverLoaded(data) {

        log.info(`${data.driver.name} driver loaded.`);
    }

    onDriverUnloaded(data) {

        log.info(`Driver ${data.driver.name} driver unloaded.`);
    }

    onInputActivated(data) {

        console.log(`Input ${data.name} activated.`);

        let control = this.translate(data);
        if (!control) {

            return;
        }

        this.enqueueCommand(new ControlActivated(control));
    }

    onInputDeactivated(data) {

        console.log(`Input ${data.name} deactivated.`);

        let control = this.translate(data);
        if (!control) {

            return;
        }

        this.enqueueCommand(new ControlDeactivated(control));
    }

    translate(input) {

        return undefined;
    }

    enqueueCommand(command) {

        this._commandBuffer.push(command);
    }

    commandBufferEmpty() {

        return this._commandBuffer.length === 0;
    }

    dequeueCommand() {

        return this._commandBuffer.shift();
    }

    run() {

        log.info("Running the app...");

        this.running = true;
        this.tick();
    }

    stop() {

        log.info("Stopping the app...");

        this.running = false;
    }

    tick() {

        while (!this.commandBufferEmpty()) {

            this.processCommand(this.dequeueCommand());
        }

        this.processFrame();

        if (this.running) {

            requestAnimationFrame(
                this.tick.bind(this)
            );
        }
    }

    processCommand(command) {

        switch (command.name) {

            case "ControlActivated":
                {
                    let controlBefore = this.controls[command.control.name];
                    this.controls[command.control.name] = command.control;
                    this.controls[command.control.name].active = true;

                    this.controlChanged.raise({
                        before: controlBefore,
                        after: this.controls[command.control.name]
                    });
                }
                break;

            case "ControlDeactivated":
                {
                    let controlBefore = this.controls[command.control.name];
            
                    this.controls[command.control.name] = command.control;
                    this.controls[command.control.name].active = false;

                    this.controlChanged.raise({
                        before: controlBefore,
                        after: this.controls[command.control.name]
                    });
                }
                break;
        }
    }

    processFrame() {

    }
};