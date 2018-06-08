import Command from "./command.js";
import AppControl from "../app/appControl.js";

export default class RegisterControl extends Command {

    /**
     * Constructs RegisterControl command.
     * 
     * @param control {AppControl} App control being registered.
     */
    constructor(control) {

        super("RegisterControl");
        
        this.control = control;
    }
}