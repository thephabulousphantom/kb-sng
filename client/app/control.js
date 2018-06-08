export default class Control {

    /**
     * Constructs a new control object.
     * 
     * @param name {String} Control name.
     * @param type {String} Control type.
     */
    constructor(name, type) {

        this.name = name;
        this.type = type;
    }

    /**
     * Returns key under which this control's state is maintained.
     */
    getStateKey() {

        return `$-${this.type}-${this.name}`;
    }
}