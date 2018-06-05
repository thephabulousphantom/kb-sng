import Command from "./command.js";

export default class ModifyStateCommand extends Command {

    constructor(key, value) {

        super("ModifyState");

        this.key = key;
        this.value = value;
    }
}