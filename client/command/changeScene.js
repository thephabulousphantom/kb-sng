import Command from "./command.js";

export default class ChangeScene extends Command {

    /**
     * Constructs ChangeScene command.
     * 
     * @param name {String} Name of the scene to change to.
     * @param byAuthority {Boolean} Specifies whether the command was issued by authority.
     */
    constructor(name, byAuthority = false) {

        super("ChangeScene", byAuthority);
        
        this.sceneName = name;
    }
}