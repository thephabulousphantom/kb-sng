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

        this._x = new Property(PropertyTypes.float, "x", this);
        this._y = new Property(PropertyTypes.float, "y", this);
        this._vx = new Property(PropertyTypes.float, "vx", this);
        this._vy = new Property(PropertyTypes.float, "vy", this);
        this._width = new Property(PropertyTypes.float, "w", this);
        this._height = new Property(PropertyTypes.float, "h", this);
    }

    get x() {

        return this._x.value();
    }

    set x(value) {

        return this._x.value(value);
    }

    get y() {

        return this._y.value();
    }

    set y(value) {

        return this._y.value(value);
    }

    get vx() {

        return this._vx.value();
    }

    set vx(value) {

        return this._vx.value(value);
    }

    get vy() {

        return this._vy.value();
    }

    set vy(value) {

        return this._vy.value(value);
    }

    get width() {

        return this._width.value();
    }

    set width(value) {

        return this._width.value(value);
    }

    get height() {

        return this._height.value();
    }

    set height(value) {

        return this._height.value(value);
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