import Command from "./command.js";
import Control from "../control/control.js";

export default class ActivateControl extends Command {

    /**
     * Constructs ActivateControl command.
     * 
     * @param control {Control} Control being activated.
     */
    constructor(control) {

        super("ActivateControl");
        
        this.control = control;
    }
}