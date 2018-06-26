import Command from "./command.js";
import Entity from "../state/entity.js";

export default class RemoveEntity extends Command {

    /**
     * Constructs RemoveEntity command.
     * 
     * @param entityName {String} Name of the entity to remove.
     */
    constructor(entityName) {

        super("RemoveEntity");
        
        this.entityName = entityName;
    }
}