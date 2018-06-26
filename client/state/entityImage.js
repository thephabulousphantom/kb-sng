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

        this.url = url;
    }
}