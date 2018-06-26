import Command from "./command.js";
import Entity from "../state/entity.js";

export default class AddEntity extends Command {

    /**
     * Constructs AddEntity command.
     * 
     * @param entity {Entity} Entity to add.
     */
    constructor(entity) {

        super("AddEntity");
        
        this.entityUid = entity.uid;
        this.entityState = entity.state;
    }
}