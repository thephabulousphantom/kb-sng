import Command from "./command.js";
import Control from "../control/control.js";

export default class UnregisterControl extends Command {

    /**
     * Constructs UnregisterControl command.
     * 
     * @param control {Control} Control being unregistered.
     */
    constructor(control) {

        super("UnregisterControl");
        
        this.control = control;
    }
}