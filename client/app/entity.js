import PropertyTypes from "./propertyTypes.js";
import Property from "./property.js";

export default class Entity extends Property {

    /**
     * Constructs an entity.
     * 
     * @param name {String} Entity name.
     * @param parent {Entity} Optional parent Entity.
     */
    constructor(name, parent) {

        super(PropertyTypes.string, name, parent);
    }

    /**
     * Processes this entity's frame.
     */
    processFrame() {

        this._children.forEach((child) => {

            if (child instanceof Entity) {

                child.processFrame();
            }
        });
    }
}