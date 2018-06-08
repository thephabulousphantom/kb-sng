import Command from "./command.js";
import Control from "../app/appControl.js";

export default class DeactivateControl extends Command {

    /**
     * Constructs DeactivateControl command.
     * 
     * @param control {AppControl} App control being deactivated.
     */
    constructor(control) {

        super("DeactivateControl");
        
        this.control = control;
    }
}