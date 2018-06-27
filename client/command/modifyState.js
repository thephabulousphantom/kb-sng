import Command from "./command.js";

export default class ModifyStateCommand extends Command {

    /**
     * Constructs ModifyStateCommand command.
     * 
     * @param key {String} Name of the state variable to modify.
     * @param value {*} Value to set to variable to.
     * @param byAuthority {Boolean} Specifies whether the command was issued by authority.
     */
    constructor(key, value, byAuthority = false) {

        super("ModifyState", byAuthority);

        this.key = key;
        this.value = value;
    }
}