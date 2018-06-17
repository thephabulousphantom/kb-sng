import Command from "./command.js";

export default class ChangeScene extends Command {

    /**
     * Constructs ChangeScene command.
     * 
     * @param name {String} Name of the scene to change to.
     */
    constructor(name) {

        super("ChangeScene");
        
        this.sceneName = name;
    }
}