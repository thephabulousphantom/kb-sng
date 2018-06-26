import Command from "./command.js";
import Entity from "../state/entity.js";

export default class RemoveEntity extends Command {

    /**
     * Constructs RemoveEntity command.
     * 
     * @param entity {Entity} Entity to remove.
     */
    constructor(entity) {

        super("RemoveEntity");
        
        this.entityUid = entity.uid;
    }
}