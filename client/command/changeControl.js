import Command from "./command.js";
import Control from "../app/appControl.js";

export default class ChangeControl extends Command {

    /**
     * Constructs ChangeControl command.
     * 
     * @param control {AppControl} App control being changed.
     */
    constructor(control) {

        super("ChangeControl");
        
        this.control = control;
    }
}