import Command from "./command.js";
import Control from "../app/appControl.js";

export default class ActivateControl extends Command {

    /**
     * Constructs ActivateControl command.
     * 
     * @param control {AppControl} App control being activated.
     */
    constructor(control) {

        super("ActivateControl");
        
        this.control = control;
    }
}