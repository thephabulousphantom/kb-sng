import Command from "./command.js";

export default class DeactivateControl extends Command {

    constructor(control) {

        super("DeactivateControl");
        
        this.control = control;
    }
}