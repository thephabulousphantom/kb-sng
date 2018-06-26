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
        
        // ### TODO: this command should somehow contain all entity
        // properties, but can't hold entity as it has reference to
        // parent entity. Alternatively, new event called UpdatedEntity
        // or similar can be used to indicate the entity state.
        this.entityName = entity.name;
    }
}