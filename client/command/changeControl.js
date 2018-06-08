import Command from "./command.js";
import Control from "../app/control.js";

export default class ChangeControl extends Command {

    /**
     * Constructs ChangeControl command.
     * 
     * @param control {Control} Control being changed.
     */
    constructor(control) {

        super("ChangeControl");
        
        this.control = control;
    }
}