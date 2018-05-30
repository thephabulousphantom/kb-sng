import Command from "./command.js";

export default class ControlDeactivated extends Command {

    constructor(control) {

        super("ControlDeactivated");
        this.control = control;
    }
}