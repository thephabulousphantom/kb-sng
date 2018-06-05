import Command from "./command.js";

export default class ActivateControl extends Command {

    constructor(control) {

        super("ActivateControl");
        
        this.control = control;
    }
}