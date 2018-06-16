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

    /**
     * Gets this entity's state (all properties) in the form of a JSON.
     */
    getState() {

        let state = {};
        for (let property in this) {

            if (property.charAt(0) === "_") {

                continue;
            }

            if (this[property] instanceof Property) {

                state[property] = this[property].value();
            }
        }

        return state;
    }

    /**
     * Sets this entity's state.
     * 
     * @param state {*} A JSON containing one or more properties to update.
     */
    setState(state) {

        for (let property in state) {

            if (property.charAt(0) === "_") {

                continue;
            }

            if (this[property] !== undefined && this[property] instanceof Property) {

                this[property].value(state[property]);
            }
        }
    }
}