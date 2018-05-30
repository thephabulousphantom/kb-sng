import Command from "./command.js";

export default class ControlActivated extends Command{

    constructor(control) {

        super("ControlActivated");
        this.control = control;
    }
}