import log from "../app/log.js";

import PropertyTypes from "./propertyTypes.js";
import Property from "./property.js";

import Scene from "../app/scene.js";

export default class Entity extends Property {

    /**
     * Constructs an entity.
     * 
     * @param name {String} Entity name.
     * @param parent {Entity} Optional parent Entity.
     */
    constructor(name, parent) {

        log.info(`Constructing entity ${name}...`);
        
        super(PropertyTypes.string, name, parent);

        this._properties = null;
        this._scene = null;
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
    get state() {

        if (!this._properties) {

            this._properties = [];

            for (let property in this) {

                if (property.charAt(0) === "_") {

                    continue;
                }

                if (this[property] instanceof Property) {

                    this._properties.push(property);
                }
            }
        }

        let state = {};
        for (let i = 0; i < this._properties.length; i++) {

            let property = this._properties[i];
            state[property] = this[property].value();
        }

        return state;
    }

    /**
     * Sets this entity's state.
     * 
     * @param state {*} A JSON containing one or more properties to update.
     */
    set state(state) {

        if (!this._properties) {

            this._properties = [];

            for (let property in this) {

                if (property.charAt(0) === "_") {

                    continue;
                }

                if (this[property] instanceof Property) {

                    this._properties.push(property);
                }
            }
        }

        for (let i = 0; i < this._properties.length; i++) {

            let property = this._properties[i];
            if (state[property] !== undefined) {

                this[property].value(state[property]);
            }
        }
    }

    get scene() {

        if (!this._scene) {

            return null;
        }

        return this._scene;
    }

    set scene(value) {

        return this._scene = value;
    }
}