import Command from "./command.js";
import Control from "../control/control.js";

export default class ChangeControl extends Command {

    /**
     * Constructs ChangeControl command.
     * 
     * @param control {Control} Control being changed.
     * @param byAuthority {Boolean} Specifies whether the command was issued by authority.
     */
    constructor(control, byAuthority = false) {

        super("ChangeControl", byAuthority);
        
        this.control = control;
    }
}