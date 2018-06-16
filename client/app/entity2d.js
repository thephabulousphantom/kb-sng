import PropertyTypes from "./propertyTypes.js";
import Property from "./property.js";
import Entity from "./entity.js";

export default class Entity2d extends Entity {

    /**
     * Constructs a 2D entity.
     * 
     * @param name {String} Entity name.
     * @param parent {Entity} Optional parent Entity.
     */
    constructor(name, parent) {

        super(name, parent);

        this.x = new Property(PropertyTypes.float, "x", this);
        this.y = new Property(PropertyTypes.float, "y", this);
        this.vx = new Property(PropertyTypes.float, "vx", this);
        this.vy = new Property(PropertyTypes.float, "vy", this);
        this.width = new Property(PropertyTypes.float, "w", this);
        this.height = new Property(PropertyTypes.float, "h", this);
    }

    /**
     * Processes this entity and all of its children for a frame.
     */
    processFrame() {

        if (this.vx.value()) {

            this.x.value(this.x.value() + this.vx.value());
        }

        if (this.vy.value()) {

            this.y.value(this.y.value() + this.vy.value());
        }

        super.processFrame();
    }
}