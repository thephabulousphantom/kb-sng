import PropertyTypes from "./propertyTypes.js";
import Property from "./property.js";
import Entity2D from "./entity2d.js";

export default class EntityImage extends Entity2D {

    /**
     * Constructs an image entity.
     * 
     * @param url {String} URL of the image.
     * @param name {String} Entity name.
     * @param parent {Entity} Optional parent Entity.
     */
    constructor(url, name, parent) {

        super(name, parent);

        this._url = new Property(PropertyTypes.String, "url", this);
    }

    get url() {

        return this._url.value();
    }

    set url(value) {

        return this._url.value(value);
    }

}