import Command from "./command.js";
import Control from "../control/control.js";

export default class DeactivateControl extends Command {

    /**
     * Constructs DeactivateControl command.
     * 
     * @param control {Control} Control being deactivated.
     */
    constructor(control) {

        super("DeactivateControl");
        
        this.control = control;
    }
}