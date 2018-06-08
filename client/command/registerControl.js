import Command from "./command.js";
import Control from "../app/control.js";

export default class RegisterControl extends Command {

    /**
     * Constructs RegisterControl command.
     * 
     * @param control {Control} Control being registered.
     */
    constructor(control) {

        super("RegisterControl");
        
        this.control = control;
    }
}